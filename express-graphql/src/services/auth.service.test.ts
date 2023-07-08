import "reflect-metadata";
import { Result } from "../dto/ResultDto";
import { UserDto } from "../dto/UserDto";
import { ResultStatus } from "../types/enums/Result";
import UserModel from "./../model/User";
import PasswordService from "./password.service";
import AuthService from "./auth.service";
import KafkaProducer from "./kafka-producer";
import { Error } from "mongoose";

// Mock the KafkaProducer class
jest.mock("./kafka-producer", () => {
  return jest.fn().mockImplementation(() => ({
    sendMessageToBroke: jest.fn().mockResolvedValue(true),
  }));
});

describe("AuthService", () => {
  let authService: AuthService;
  let passwordService: PasswordService;

  beforeEach(() => {
    const kafkaProducer = new KafkaProducer();
    passwordService = new PasswordService();
    authService = new AuthService(kafkaProducer, passwordService);
  });

  describe("getUserById", () => {
    it("should return a user when a valid ID is provided", async () => {
      UserModel.findById = jest
        .fn()
        .mockResolvedValueOnce({ _id: "1", name: "John" });

      const user = await authService.getUserById("1");

      expect(user).toEqual({ _id: "1", name: "John" });
      expect(UserModel.findById).toHaveBeenCalledWith("1");
    });

    it("should return null when an invalid ID is provided", async () => {
      UserModel.findById = jest.fn().mockResolvedValueOnce(null);

      const user = await authService.getUserById("invalid-id");

      expect(user).toBeNull();
      expect(UserModel.findById).toHaveBeenCalledWith("invalid-id");
    });
  });

  describe("signUp", () => {
    it("should create a new user and return a success result", async () => {
      UserModel.find = jest.fn().mockResolvedValueOnce([]);
      UserModel.prototype.save = jest.fn();

      const user: UserDto = {
        email: "test@example.com",
        username: "testuser",
        password: "password",
      };
      const result: Result = {
        message: "User created.",
        result: ResultStatus.Success,
      };

      const signUpResult = await authService.signUp(user);

      expect(UserModel.find).toHaveBeenCalledWith({
        $or: [{ email: user.email }, { username: user.username }],
      });
      expect(UserModel.prototype.save).toHaveBeenCalled();
      expect(signUpResult).toEqual(result);
    });

    it("should return an error result when email or username is already in use", async () => {
      // Create a mock implementation of UserModel.find
      UserModel.find = jest
        .fn()
        .mockResolvedValueOnce([{ email: "test@example.com" }]);

      const user: UserDto = {
        email: "test@example.com",
        username: "testuser",
        password: "password",
      };
      const result: Result = {
        message: "Email/Username invalid, already in use.",
        result: ResultStatus.Error,
      };

      const signUpResult = await authService.signUp(user);

      expect(UserModel.find).toHaveBeenCalledWith({
        $or: [{ email: user.email }, { username: user.username }],
      });
      expect(signUpResult).toEqual(result);
    });

    it("should return an error result when validation fails", async () => {
      // Create a mock implementation of UserModel.find
      UserModel.find = jest.fn().mockResolvedValueOnce([]);
      UserModel.prototype.save = jest.fn();

      const user: UserDto = {
        email: "test@example.com",
        username: "testuser",
        password: "password",
      };
      const result: Result = {
        message: "Invalid values.",
        result: ResultStatus.Error,
      };

      // Simulate validation errors
      UserModel.prototype.validateSync = jest
        .fn()
        .mockReturnValueOnce(new Error.ValidationError());

      const signUpResult = await authService.signUp(user);

      expect(UserModel.find).toHaveBeenCalledWith({
        $or: [{ email: user.email }, { username: user.username }],
      });
      expect(UserModel.prototype.save).not.toHaveBeenCalled();
      expect(UserModel.prototype.validateSync).toHaveBeenCalled();
      expect(signUpResult).toEqual(result);
    });
  });
});
