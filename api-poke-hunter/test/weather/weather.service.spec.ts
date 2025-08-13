import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { WeatherService } from '../../src/modules/weather/weather.service';
import { PokemonService } from '../../src/modules/pokemon/pokemon.service';
import { mockOpenWeatherResponse } from '../../mocks/open-weather.interface.mock';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpService: HttpService;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: PokemonService,
          useValue: {
            getRandomPokemonByType: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    httpService = module.get<HttpService>(HttpService);
    pokemonService = module.get<PokemonService>(PokemonService);
    process.env.OPEN_WEATHER_API_KEY = 'test-api-key';
    process.env.OPEN_WEATHER_BASE_URL =
      'https://api.openweathermap.org/data/2.5';
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWeather', () => {
    it('should return weather data for a valid city', async () => {
      const mockResponse: AxiosResponse = {
        data: mockOpenWeatherResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

      const result = await service.getWeather('London');
      expect(result).toEqual({
        city: expect.any(String),
        temperature: expect.any(Number),
        condition: expect.any(String),
        isRaining: expect.any(Boolean),
      });
    });

    it('should throw NotFoundException for empty city', async () => {
      await expect(service.getWeather('')).rejects.toThrow(
        'City is required. Please provide a valid city name.',
      );
    });

    it('should throw Error when environment variables are missing', async () => {
      delete process.env.OPEN_WEATHER_API_KEY;
      await expect(service.getWeather('London')).rejects.toThrow(
        'Missing required environment variables',
      );
    });

    it('should throw NotFoundException for invalid city', async () => {
      const axiosError = new AxiosError();
      axiosError.response = {
        status: 404,
        data: {},
        statusText: 'Not Found',
        headers: {},
        config: {} as any,
      };

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(() => axiosError));

      await expect(service.getWeather('InvalidCity')).rejects.toThrow(
        'City not found',
      );
    });
  });

  describe('getWeatherWithPokemon', () => {
    it('should return weather data with pokemon for a valid city', async () => {
      const mockWeatherResponse: AxiosResponse = {
        data: mockOpenWeatherResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of(mockWeatherResponse));
      jest
        .spyOn(pokemonService, 'getRandomPokemonByType')
        .mockResolvedValueOnce({
          name: 'pikachu',
          image: 'pikachu.png',
        });

      const result = await service.getWeatherWithPokemon('London');
      expect(result).toEqual({
        city: expect.any(String),
        temperature: expect.any(Number),
        condition: expect.any(String),
        isRaining: expect.any(Boolean),
        pokemon: 'pikachu',
        pokemonType: expect.any(String),
        pokemonImage: 'pikachu.png',
        timestamp: expect.any(Number),
      });
    });

    it('should handle API error responses', async () => {
      const mockErrorResponse = {
        cod: '404',
        message: 'city not found',
      };

      const mockResponse: AxiosResponse = {
        data: mockErrorResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

      await expect(
        service.getWeatherWithPokemon('InvalidCity'),
      ).rejects.toThrow('Failed to fetch weather data');
    });
  });

  describe('determinePokemonType', () => {
    it('should return electric type when raining', () => {
      const result = (service as any).determinePokemonType({ isRaining: true });
      expect(result).toBe('electric');
    });

    it('should return ice type for temp < 5', () => {
      const result = (service as any).determinePokemonType({
        isRaining: false,
        temperature: 4,
      });
      expect(result).toBe('ice');
    });

    it('should return water type for 5 <= temp < 10', () => {
      const result = (service as any).determinePokemonType({
        isRaining: false,
        temperature: 7,
      });
      expect(result).toBe('water');
    });

    it('should return grass type for 12 <= temp <= 15', () => {
      const result = (service as any).determinePokemonType({
        isRaining: false,
        temperature: 14,
      });
      expect(result).toBe('grass');
    });

    it('should return ground type for 15 < temp <= 21', () => {
      const result = (service as any).determinePokemonType({
        isRaining: false,
        temperature: 18,
      });
      expect(result).toBe('ground');
    });

    it('should return bug type for 23 <= temp <= 27', () => {
      const result = (service as any).determinePokemonType({
        isRaining: false,
        temperature: 25,
      });
      expect(result).toBe('bug');
    });

    it('should return rock type for 27 < temp <= 33', () => {
      const result = (service as any).determinePokemonType({
        isRaining: false,
        temperature: 30,
      });
      expect(result).toBe('rock');
    });

    it('should return fire type for temp > 33', () => {
      const result = (service as any).determinePokemonType({
        isRaining: false,
        temperature: 35,
      });
      expect(result).toBe('fire');
    });

    it('should return normal type for other temperatures', () => {
      const result = (service as any).determinePokemonType({
        isRaining: false,
        temperature: 11,
      });
      expect(result).toBe('normal');
    });
  });

  describe('transformWeatherData', () => {
    it('should transform API response correctly', () => {
      const result = (service as any).transformWeatherData(
        mockOpenWeatherResponse,
      );
      expect(result).toEqual({
        city: expect.any(String),
        temperature: expect.any(Number),
        condition: expect.any(String),
        isRaining: expect.any(Boolean),
      });
    });

    it('should handle unknown weather condition', () => {
      const data = { ...mockOpenWeatherResponse, weather: [] };
      const result = (service as any).transformWeatherData(data);
      expect(result.condition).toBe('Unknown');
    });
  });
});
