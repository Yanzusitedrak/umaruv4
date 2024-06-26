export const setup = {
  name: "teamlogo",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Make Team Logo",
  category: "Logo Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/teamlogo/screenshot/main.jpg"],
  screenshot: ["/media/teamlogo/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"teamlogo": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["teamlogo"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}