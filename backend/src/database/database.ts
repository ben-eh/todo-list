// Step 1: Install the MongoDB driver for Node.js using npm
// npm install mongodb

// Step 2: Import the MongoDB driver in your code
import { Db, MongoClient } from 'mongodb';

class DatabaseClass {
	private _client: MongoClient;
	private _db: Db;

	constructor() {
		this._client = new MongoClient('mongodb://localhost:27017');
		this._db = this._client.db('Todos');
	}

	public connect = async (): Promise<void> => {
    try {
      await this._client.connect();

      // do something when app is closing
      process.on('exit', this.disconnect);
      
      // catches ctrl+c event
      process.on('SIGINT', this.disconnect);
      process.on('SIGTERM', this.disconnect);
      
      // catches "kill pid" (for example: nodemon restart)
      process.on('SIGUSR1', this.disconnect);
      process.on('SIGUSR2', this.disconnect);
      
      // catches uncaught exceptions
      process.on('uncaughtException', this.disconnect);
    } catch (error) {
      throw new Error('Could not connect to database');
    }
  };

	public database = () => {
		return this._db;
	}
	
	public disconnect = async (): Promise<void> => {
		try {
			await this._client.close();
			process.exit(0);
		} catch (error) {
			throw new Error('Could not close database connection');
		}
	};
}

const mongo = process.env['MONGO_DB_CONNECTION_STRING'] || '';
const name = process.env['DATABASE'] || 'SLOM_Test';
const Database = new DatabaseClass();
Database.connect();

export default Database;
