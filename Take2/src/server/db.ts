import minimongo from "minimongo";

const LocalDb = minimongo.MemoryDb;

class DB {
    db
    constructor() {
        this.db = new LocalDb();
        this.db.addCollection("users");
        populateDB(this.db)
    }

    get(user_id: number, callback) {
        console.log(`Received request for user ${user_id}`)
        this.db.users.findOne({user_id}, {}, res => {
            /* The gRPC callback is an error-first callback. The response must have the shape defined in the proto definition:

             message UserList {
               repeated User user = 1;
             }

             otherwise it will be decoded as empty on the client */

            callback(null, {user: [res]})
        })
    }

    list(callback) {
        console.log(`Received request for user list`)
        return this.db.users.find({}).fetch(res => {
            callback(null, {user: res})
        })
    }
}

function populateDB(db) {
    const users = [
        {
            user_id: 1,
            name: "Bingo",
            email: "bingo@whatever.com"
        },
        {
            user_id: 2,
            name: "Joe Bloggs",
            email: "joebloggs@whatever.com"
        },
        {
            user_id: 3,
            name: "John Doe",
            email: "johndoe@whatever.com"
        },
        {
            user_id: 4,
            name: "Jane Doe",
            email: "janedoe@whatever.com"
        }
    ]

    db.users.upsert(users, () => console.log('Database initialised'))
}

export const db = new DB()
