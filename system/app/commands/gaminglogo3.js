export const setup = {
  name: "gaminglogo3",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Gaming logo maker for FPS game team",
  category: "Logo Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/gaminglogo3/screenshot/main.jpg"],
  screenshot: ["/media/gaminglogo3/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"gaminglogo3": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["gaminglogo3"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}