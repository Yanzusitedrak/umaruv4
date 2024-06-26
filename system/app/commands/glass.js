export const setup = {
  name: "glass",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create 3D style glass text effect",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/glass/screenshot/main.jpg"],
  screenshot: ["/media/glass/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"glass": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["glass"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}