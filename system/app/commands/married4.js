export const setup = {
  name: "married4",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Marry someone using mention",
  category: "edit-img",
  usages: [
    "[userID]",
    "[@mention]",
    "[userID] [userID]",
    "[@mention] [@mention]"
  ],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"married4": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, prefix, context, usage}) {
  let mentions = Object.keys(event.mentions);
  if(mentions.length === 1) {mentions[1] = mentions[0]; mentions[0] = event.senderID;}
  if(args.length === 1 && /^[0-9]+$/.test(args[0])) {mentions[0] = event.senderID;mentions[1] = args[0];}
  if(args.length === 2 && /^[0-9]+$/.test(args[0]) && /^[0-9]+$/.test(args[1])) {mentions[1] = args[0]; mentions[0] = args[1];}
  if(event.isGroup == false) {mentions[0] = event.senderID;mentions[1] = api.getCurrentUserID();}
  if(event.isGroup == true && mentions.length === 0) return usage(this, prefix, event);
  await umaru.createJournal(event);
  let gender = await Users.getGender(mentions[0]);
  let gender2 = await Users.getGender(mentions[1]);
  let female = "";
  let male = "";
  if(gender == "MALE") {male = mentions[0]; female = mentions[1]} else if(gender == "FEMALE") {female = mentions[0]; male = mentions[1]} else if(gender2 == "MALE") {male = mentions[1]; female = mentions[0]} else if(gender2 == "FEMALE") {male = mentions[0]; female = mentions[1]} else { male = mentions[1]; female = mentions[0]}
  return api.sendMessage({body: context, attachment: await kernel.readStream(["married4"], {key: key, senderID: await Users.getImage(male), targetID: await Users.getImage(female)})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}