import { AzureFunction, Context } from "@azure/functions";
import { mailSender } from "../../shared/utils/Mail/mailSender";
interface IQueueItem {
  name: string;
  email: string;
}

const queueTrigger: AzureFunction = async function (
  context: Context,
  queueItem: IQueueItem
): Promise<void> {
  const { name, email } = queueItem;
  await mailSender(name, email);
};

export default queueTrigger;
