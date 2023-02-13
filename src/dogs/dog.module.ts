import { Global, Module } from "@nestjs/common";
import { DogController } from "./dog.controller";
import { DogService } from "./dog.service";

//Nest, however, encapsulates providers inside the module scope.
//You aren't able to use a module's providers elsewhere without first importing the encapsulating module.
@Global()//The @Global() decorator makes the module global-scoped
@Module({
  controllers:[DogController],
  providers:[DogService],
  exports:[DogService]
})
export class DogModule{

}