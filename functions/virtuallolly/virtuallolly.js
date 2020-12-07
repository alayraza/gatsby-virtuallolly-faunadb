const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require("faunadb");
const q = faunadb.query;
const shortid =require('shortid');

const typeDefs = gql`
  type Query {
    lolliesInfo: [Lolly]
  }
  type Lolly {
    recipientName: String!
    message: String!
    senderName: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    lollyPath: String!
  }
  type Mutation{
    createLolly(recipientName: String!,message: String!,senderName: String!,flavourTop: String!,flavourMiddle: String!,flavourBottom: String!) : Lolly
    SpecificlolliInfo(lollyPath: String!): Lolly
  }
`
const client = new faunadb.Client({
  secret: "fnAD7-mUOwACBel5K3AHknOTVZedv8mpQ4I-ma5X",
});
// const norecord = {
//   "data":{
//     "SpecificlolliInfo":{
//       "recipientName":"no", 
//       "message": "no",
//       "senderName": "no",
//       "flavourTop": "no",
//       "flavourMiddle": "no",
//       "flavourBottom": "no",
//       "lollyPath": "no"
//     }
//   }
// }

// const norec={
//   recipientName: '',
//   message: '',
//   senderName: '',
//   flavourTop: '',
//   flavourMiddle: '',
//   flavourBottom: '',
//   lollyPath: ''
// }
const resolvers = {
  Query: {
    lolliesInfo: async (root, args, context) => {
      try {
        const result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("all_lollies"))),
            q.Lambda((lolly) => q.Get(lolly))
          )
        );

        const data = result.data.map((lolly) => {
          return {
            recipientName: lolly.data.recipientName,
            message: lolly.data.message,
            senderName: lolly.data.senderName,
            flavourTop: lolly.data.flavourTop,
            flavourMiddle: lolly.data.flavourMiddle,
            flavourBottom: lolly.data.flavourBottom,
            lollyPath: lolly.data.lollyPath,
          };
        });
        return data;
      } catch (error) {
        return error.toString();
      }
    }
  },
  Mutation:{
    createLolly: async (_,args)=>{
      console.log("args",args);
      // const client = new faunadb.Client({secret:"fnAD7-mUOwACBel5K3AHknOTVZedv8mpQ4I-ma5X"});
      const id = shortid.generate();
      args.lollyPath = id;

      const result = await client.query(
        q.Create(q.Collection("lollies"),{
          data:args
        })
      );

      console.log("result ",result.data);
      return result.data;
    },
    SpecificlolliInfo: async (_, {lollyPath} ) => {
      console.log("specific ",lollyPath);
      try {
        const result = await client.query(
          q.Get(q.Match(q.Index("lolly_by_Path"), lollyPath))
        );
        console.log("response", result.data)
        return result.data;
      } catch (error) {
        // return norec;
        return error.toString();
      }
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
