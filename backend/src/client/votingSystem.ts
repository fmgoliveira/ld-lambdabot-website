import fetch from 'node-fetch';
import { User, Vote } from '../database/schemas';
import { Client, Collection, GuildMember, MessageEmbed } from "discord.js";

export default async (client: Client) => {
  const getVotedMembers = async () => {
    const db = await Vote.find({});

    db.forEach(async (doc) => {
      const time = parseInt(doc.timestamp);
      const now = Date.now() - 43200000;
      if (time < now) await Vote.deleteOne({ _id: doc._id });
    })

    const votedDiscordLabs = await Vote.find({ list: "discordlabs" });
    const votedBotsForDiscord = await Vote.find({ list: "botsfordiscord" });
    const votedTopGG = await Vote.find({ list: "topgg" });
    const votedInfinityBots = await Vote.find({ list: "infinitybots" });

    const members = client.guilds.cache.get(process.env.LAMBDA_GUILD_ID!)!.members.cache;
    const votedMembers: Collection<string, { user: GuildMember | undefined }> = new Collection();

    if (votedDiscordLabs) votedDiscordLabs.forEach((member) => {
      if (!votedMembers.has(member.userId)) votedMembers.set(member.userId, {
        user: members.get(member.userId),
      });
    });
    if (votedBotsForDiscord) votedBotsForDiscord.forEach((member) => {
      if (!votedMembers.has(member.userId)) votedMembers.set(member.userId, {
        user: members.get(member.userId),
      });
    });
    if (votedTopGG) votedTopGG.forEach((member) => {
      if (!votedMembers.has(member.userId)) votedMembers.set(member.userId, {
        user: members.get(member.userId),
      });
    });
    if (votedInfinityBots) votedInfinityBots.forEach((member) => {
      if (!votedMembers.has(member.userId)) votedMembers.set(member.userId, {
        user: members.get(member.userId),
      });
    });

    return votedMembers;
  };

  const updateMemberRoles = (votedMembers: Collection<string, { user: GuildMember | undefined }>) => {
    const membersWithVotedRole = client.guilds.cache.get(process.env.LAMBDA_GUILD_ID!)!.roles.cache.get(process.env.VOTED_ROLE!)!.members.map(m => m);

    membersWithVotedRole.forEach((member: any) => {
      const Member = votedMembers.get(member.id);
      if (!Member) member.roles.remove(process.env.VOTED_ROLE!);
    });

    votedMembers.forEach((member: any) => {
      const user = member.user;
      try {
        if (!user.roles.cache.has(process.env.VOTED_ROLE!)) user.roles.add(process.env.VOTED_ROLE!);
      } catch (err) { console.log(err); }
    });
  };

  const webhook = (await client.guilds.cache.get('878935240377241701')!.fetchWebhooks()).get("936677792702140416");
  const updateVotedMessage = ((votedMembers: Collection<string, { user: GuildMember | undefined }>) => {
    const embeds: any = [];
    const votedArray: any = [];

    votedMembers.forEach((member: any) => {
      votedArray.push({ user: member.user.user, amount: member.amount });
    });

    let firstEmbed = new MessageEmbed()
      .setColor("#2f3136")
      .setTitle("**Users who have upvoted Lambda Bot**");
    let lastEmbed = new MessageEmbed()
      .setColor("#2f3136")
      .setFooter({ text: "You can be here too: just upvote the bot!" });

    let embed2 = new MessageEmbed().setColor("#2f3136");
    let embed3 = new MessageEmbed().setColor("#2f3136");
    let embed4 = new MessageEmbed().setColor("#2f3136");
    let embed5 = new MessageEmbed().setColor("#2f3136");
    let embed6 = new MessageEmbed().setColor("#2f3136");
    let embed7 = new MessageEmbed().setColor("#2f3136");
    let embed8 = new MessageEmbed().setColor("#2f3136");
    let embed9 = new MessageEmbed().setColor("#2f3136");

    if (votedArray.length === 0) {
      firstEmbed.setFooter({ text: "You can be here: just upvote the bot!" }).setDescription(`There are no users who have upvoted the bot. **Be the first!**`);
      embeds.push(firstEmbed);
    } else {
      firstEmbed.setFooter({ text: "You can be here too: just upvote the bot!" });
      var string = "";

      votedArray.slice(0, 40).forEach((member: any) => {
        string += `• **${member.user.tag}** is now a <@&919936171717591061>\n`;
      });
      firstEmbed.setDescription(string);
      embeds.push(firstEmbed);
    };

    if (votedArray.length > 40) {
      var string = "";

      votedArray.slice(40, 80).forEach((member: any) => {
        string += `• **${member.user.tag}** is now a <@&919936171717591061>\n`;
      });
      embed2.setDescription(string);
      embeds.push(embed2);
    };
    if (votedArray.length > 80) {
      var string = "";

      votedArray.slice(80, 120).forEach((member: any) => {
        string += `• **${member.user.tag}** is now a <@&919936171717591061>\n`;
      });
      embed3.setDescription(string);
      embeds.push(embed3);
    };
    if (votedArray.length > 120) {
      var string = "";

      votedArray.slice(120, 160).forEach((member: any) => {
        string += `• **${member.user.tag}** is now a <@&919936171717591061>\n`;
      })
      embed4.setDescription(string);
      embeds.push(embed4);
    }
    if (votedArray.length > 160) {
      var string = "";

      votedArray.slice(160, 200).forEach((member: any) => {
        string += `• **${member.user.tag}** is now a <@&919936171717591061>\n`;
      })
      embed5.setDescription(string);
      embeds.push(embed5);
    }
    if (votedArray.length > 200) {
      var string = "";

      votedArray.slice(200, 240).forEach((member: any) => {
        string += `• **${member.user.tag}** is now a <@&919936171717591061>\n`;
      })
      embed6.setDescription(string);
      embeds.push(embed6);
    }
    if (votedArray.length > 240) {
      var string = "";

      votedArray.slice(240, 280).forEach((member: any) => {
        string += `• **${member.user.tag}** is now a <@&919936171717591061>\n`;
      })
      embed7.setDescription(string);
      embeds.push(embed7);
    }
    if (votedArray.length > 280) {
      var string = "";

      votedArray.slice(280, 320).forEach((member: any) => {
        string += `• **${member.user.tag}** is now a <@&919936171717591061>\n`;
      })
      embed8.setDescription(string);
      embeds.push(embed8);
    }
    if (votedArray.length > 320) {
      var string = "";

      votedArray.slice(320, 360).forEach((member: any) => {
        string += `• **${member.user.tag}** is now a <@&919936171717591061>\n`;
      })
      embed9.setDescription(string);
      embeds.push(embed9);
    }
    if (votedArray.length > 360) {
      var string = "";

      votedArray.slice(360, 400).forEach((member: any) => {
        string += `• **${member.user.tag}** is now a <@&919936171717591061>\n`;
      })
      lastEmbed.setDescription(string);
      embeds.push(lastEmbed);
    };

    webhook?.editMessage("977976966491820072", {
      content: null,
      embeds,
    });
  });

  const updateDatabase = async (votedMembers: Collection<string, { user: GuildMember | undefined }>) => {
    const votedDb = await User.find({ voted: true });

    votedDb.forEach(async (user: any) => {
      if (!votedMembers.has(user.discordId)) {
        user.voted = false;
        await user.save();
      };
    });

    votedMembers.forEach(async (member: any) => {
      await User.findOneAndUpdate({
        discordId: member.user.id
      }, {
        discordId: member.user.id,
        voted: true,
      }, {
        upsert: true,
        new: true
      });
    });
  };

  setInterval(async () => {
    const votedMembers = await getVotedMembers();
    updateMemberRoles(votedMembers);
    updateVotedMessage(votedMembers);
    updateDatabase(votedMembers);
  }, 10000);
}