import { Route, RpcRegistry, Service, Settings } from "grpc-server-ts";
import {db} from './db';

const settings = {
  port: "50050",                     // listen port
  host: "localhost"                // listen host
}

@Service('proto/users.proto')
export class UsersService {

  @Route
  public async Get(user_id) {
    console.log(`Received get request for ${user_id}`)
    return new Promise(res => db.get(user_id, (err, user) => res({user: [user]})))
  }

  @Route
  public async List() {
    console.log(`Received list request `)
    return new Promise(res => db.list((err, user) => res(user)))
  }

  @Route
  public async Remove(user_id) {
      return null
  }

  @Route
  public async Insert() {
      return null
  }
}

@Settings(settings)
class RPC extends RpcRegistry { }
RPC.start();
