import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    return { text: "hello World!" };
  }
}
