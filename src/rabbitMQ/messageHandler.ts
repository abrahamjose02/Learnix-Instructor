import { InstructorController } from "../controller/controller";
import { InstructorRepostiory } from "../Repository/Instructor.Repository";
import { InstructorService } from "../service/InstructorService";
import rabbitClient from "./client";

const instructorRepository = new InstructorRepostiory()
const service = new InstructorService(instructorRepository)
const controller = new InstructorController(service)

export default class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string
  ) {
    let response = data;



    console.log("The operation is", operation, data);

    switch (operation) {
      case "register-instructor":
        response = await controller.registerInstructor.bind(controller)(data)
        break;

        case "get-instructor":
          response = await controller.getInstructorByUserId.bind(controller)(data.id);
          break;

      default:
        response = "Request-key notfound";
        break;
    }

    //Produce the response back to the client
    await rabbitClient.produce(response, correlationId, replyTo);
  }
}