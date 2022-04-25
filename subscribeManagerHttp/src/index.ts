import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const name = req.body?.name;
  const email = req.body?.email;

  if (!(name && email)) {
    context.res = {
      body: {
        error: "Please inform your name and email for subscription!",
      },
    };
    return;
  }

  context.res = {
    body: {
      message: "You are subscribed!",
    },
  };

  context.bindings.outQueue = {
    name,
    email,
  };
};

export default httpTrigger;
