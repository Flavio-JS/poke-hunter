import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { PokemonService } from '../../src/modules/pokemon/pokemon.service';
import { mockPokeApiPokemonResponse, mockPokeApiTypeRelations, mockPokeApiTypeResponse } from '../../mocks/poke-api.interface.mock';


describe('PokemonService', () => {
  let service: PokemonService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    httpService = module.get<HttpService>(HttpService);
    process.env.POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPokemonByType', () => {
    it('should return pokemons for a valid type', async () => {
      const mockResponse: AxiosResponse = {
        data: mockPokeApiTypeResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

      const result = await service.getPokemonByType('fire');
      expect(result).toEqual(
        expect.objectContaining({
          type: 'fire',
          pokemons: expect.arrayContaining([expect.any(String)]),
        }),
      );
    });

    it('should throw NotFoundException for invalid type', async () => {
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

      await expect(service.getPokemonByType('invalid')).rejects.toThrow(
        "Pokémon type 'invalid' not found",
      );
    });

    it('should throw BadRequestException for empty type', async () => {
      await expect(service.getPokemonByType('')).rejects.toThrow(
        'Type is required. Please provide a valid Pokémon type.',
      );
    });

    it('should throw Error when POKE_API_BASE_URL is not set', async () => {
      delete process.env.POKE_API_BASE_URL;
      await expect(service.getPokemonByType('fire')).rejects.toThrow(
        'POKE_API_BASE_URL environment variable is not set',
      );
    });
  });

  describe('getRandomPokemonByType', () => {
    it('should return a random pokemon for a valid type', async () => {
      const mockTypeResponse: AxiosResponse = {
        data: mockPokeApiTypeResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      const mockPokemonResponse: AxiosResponse = {
        data: mockPokeApiPokemonResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of(mockTypeResponse))
        .mockReturnValueOnce(of(mockPokemonResponse));

      const result = await service.getRandomPokemonByType('water');
      expect(result).toEqual({
        name: expect.any(String),
        image: expect.any(String),
      });
    });

    it('should throw NotFoundException when no pokemons found for type', async () => {
      const mockEmptyResponse: AxiosResponse = {
        data: { pokemon: [] },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockEmptyResponse));

      await expect(service.getRandomPokemonByType('unknown')).rejects.toThrow(
        'No pokémons found for type unknown',
      );
    });
  });

  describe('getBattleEffectiveness', () => {
    it('should return battle effectiveness data for a valid type', async () => {
      const mockResponse: AxiosResponse = {
        data: mockPokeApiTypeRelations,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

      // Mock the internal method that fetches pokemons
      jest
        .spyOn(service as any, 'getMultiplePokemonsByType')
        .mockResolvedValue([{ name: 'test', image: 'test.png' }]);

      const result = await service.getBattleEffectiveness('fire');
      expect(result).toEqual(
        expect.objectContaining({
          strongAgainst: expect.arrayContaining([
            expect.objectContaining({
              pokemon: expect.any(String),
              type: expect.any(String),
              image: expect.any(String),
            }),
          ]),
          weakAgainst: expect.arrayContaining([
            expect.objectContaining({
              pokemon: expect.any(String),
              type: expect.any(String),
              image: expect.any(String),
            }),
          ]),
        }),
      );
    });

    it('should handle empty damage relations', async () => {
      const mockEmptyRelations = {
        damage_relations: {
          double_damage_to: [],
          double_damage_from: [],
        },
      };

      const mockResponse: AxiosResponse = {
        data: mockEmptyRelations,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

      const result = await service.getBattleEffectiveness('normal');
      expect(result.strongAgainst).toEqual([]);
      expect(result.weakAgainst).toEqual([]);
    });
  });

  describe('transformPokemonData', () => {
    it('should transform API response correctly', () => {
      const result = (service as any).transformPokemonData(
        'fire',
        mockPokeApiTypeResponse,
      );
      expect(result).toEqual({
        type: 'fire',
        pokemons: expect.arrayContaining([expect.any(String)]),
      });
    });

    it('should throw error for invalid data structure', () => {
      expect(() =>
        (service as any).transformPokemonData('fire', { pokemon: null }),
      ).toThrow('Invalid Pokémon data structure received from API');
    });
  });
});
