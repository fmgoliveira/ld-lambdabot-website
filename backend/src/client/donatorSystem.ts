import { User, Donator } from '../database/schemas';
import { Client, Collection, GuildMember, MessageEmbed } from "discord.js";

export default async (client: Client) => {
  const getDonatorMembers = async () => {
    const donator = await Donator.find({ type: "lifetime", userId: { $ne: "" } });
    const premium = await Donator.find({ type: "subscription", userId: { $ne: "" } });

    const members = client.guilds.cache.get(process.env.LAMBDA_GUILD_ID!)!.members.cache;
    const donatorMembers: Collection<string, { user: GuildMember | undefined }> = new Collection();
    const premiumMembers: Collection<string, { user: GuildMember | undefined }> = new Collection();

    if (donator) donator.forEach((member) => {
      if (!donatorMembers.has(member.userId)) donatorMembers.set(member.userId, {
        user: members.get(member.userId),
      });
    });
    if (premium) premium.forEach((member) => {
      if (!premiumMembers.has(member.userId)) premiumMembers.set(member.userId, {
        user: members.get(member.userId),
      });
    });

    return { donatorMembers, premiumMembers };
  };

  const updateMemberRoles = (donatorMembers: Collection<string, { user: GuildMember | undefined }>, premiumMembers: Collection<string, { user: GuildMember | undefined }>) => {
    const membersWithPremiumRole = client.guilds.cache.get(process.env.LAMBDA_GUILD_ID!)!.roles.cache.get(process.env.PREMIUM_ROLE!)!.members.map(m => m);
    const membersWithDonatorRole = client.guilds.cache.get(process.env.LAMBDA_GUILD_ID!)!.roles.cache.get(process.env.DONATOR_ROLE!)!.members.map(m => m);

    membersWithPremiumRole.forEach((member: any) => {
      const Member = premiumMembers.get(member.id);
      if (!Member) member.roles.remove(process.env.PREMIUM_ROLE!);
    });

    membersWithPremiumRole.forEach((member: any) => {
      const user = member.user;
      try {
        if (!user.roles.cache.has(process.env.PREMIUM_ROLE!)) user.roles.add(process.env.PREMIUM_ROLE!);
      } catch (err) { console.log(err); }
    });

    membersWithDonatorRole.forEach((member: any) => {
      const Member = donatorMembers.get(member.id);
      if (!Member) member.roles.remove(process.env.DONATOR_ROLE!);
    });

    membersWithDonatorRole.forEach((member: any) => {
      const user = member.user;
      try {
        if (!user.roles.cache.has(process.env.DONATOR_ROLE!)) user.roles.add(process.env.DONATOR_ROLE!);
      } catch (err) { console.log(err); }
    });
  };

  const webhook = (await client.guilds.cache.get('878935240377241701')!.fetchWebhooks()).get("936677792702140416");
  const updatePremiumMessage = (premiumMembers: Collection<string, { user: GuildMember | undefined }>) => {
    const embeds: any = [];
    const premiumArray: any = [];

    premiumMembers.forEach((member: any) => {
      premiumArray.push({ user: member.user.user, amount: member.amount });
    });

    let firstEmbed = new MessageEmbed()
      .setColor("#2f3136")
      .setTitle("**Users who are premium**");
    let lastEmbed = new MessageEmbed()
      .setColor("#2f3136")
      .setFooter({ text: "You can be here too: just donate us!" });

    let embed2 = new MessageEmbed().setColor("#2f3136");
    let embed3 = new MessageEmbed().setColor("#2f3136");
    let embed4 = new MessageEmbed().setColor("#2f3136");
    let embed5 = new MessageEmbed().setColor("#2f3136");
    let embed6 = new MessageEmbed().setColor("#2f3136");
    let embed7 = new MessageEmbed().setColor("#2f3136");
    let embed8 = new MessageEmbed().setColor("#2f3136");
    let embed9 = new MessageEmbed().setColor("#2f3136");

    if (premiumArray.length === 0) {
      firstEmbed.setFooter({ text: "You can be here: just donate us!" }).setDescription(`There are no users who are premium currently. **Be the first!**`);
      embeds.push(firstEmbed);
    } else {
      firstEmbed.setFooter({ text: "You can be here too: just donate us!" });
      var string = "";

      premiumArray.slice(0, 40).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962561184772108>\n`;
      });
      firstEmbed.setDescription(string);
      embeds.push(firstEmbed);
    };

    if (premiumArray.length > 40) {
      var string = "";

      premiumArray.slice(40, 80).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962561184772108>\n`;
      });
      embed2.setDescription(string);
      embeds.push(embed2);
    };
    if (premiumArray.length > 80) {
      var string = "";

      premiumArray.slice(80, 120).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962561184772108>\n`;
      });
      embed3.setDescription(string);
      embeds.push(embed3);
    };
    if (premiumArray.length > 120) {
      var string = "";

      premiumArray.slice(120, 160).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962561184772108>\n`;
      })
      embed4.setDescription(string);
      embeds.push(embed4);
    }
    if (premiumArray.length > 160) {
      var string = "";

      premiumArray.slice(160, 200).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962561184772108>\n`;
      })
      embed5.setDescription(string);
      embeds.push(embed5);
    }
    if (premiumArray.length > 200) {
      var string = "";

      premiumArray.slice(200, 240).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962561184772108>\n`;
      })
      embed6.setDescription(string);
      embeds.push(embed6);
    }
    if (premiumArray.length > 240) {
      var string = "";

      premiumArray.slice(240, 280).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962561184772108>\n`;
      })
      embed7.setDescription(string);
      embeds.push(embed7);
    }
    if (premiumArray.length > 280) {
      var string = "";

      premiumArray.slice(280, 320).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962561184772108>\n`;
      })
      embed8.setDescription(string);
      embeds.push(embed8);
    }
    if (premiumArray.length > 320) {
      var string = "";

      premiumArray.slice(320, 360).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962561184772108>\n`;
      })
      embed9.setDescription(string);
      embeds.push(embed9);
    }
    if (premiumArray.length > 360) {
      var string = "";

      premiumArray.slice(360, 400).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962561184772108>\n`;
      })
      lastEmbed.setDescription(string);
      embeds.push(lastEmbed);
    };

    webhook?.editMessage("979372530840244315", {
      content: null,
      embeds,
    });
  };

  const updateDonatorMessage = (donatorMembers: Collection<string, { user: GuildMember | undefined }>) => {
    const embeds: any = [];
    const donatorArray: any = [];

    donatorMembers.forEach((member: any) => {
      donatorArray.push({ user: member.user.user, amount: member.amount });
    });

    let firstEmbed = new MessageEmbed()
      .setColor("#2f3136")
      .setTitle("**Users who have donated us**");
    let lastEmbed = new MessageEmbed()
      .setColor("#2f3136")
      .setFooter({ text: "You can be here too: just donate us!" });

    let embed2 = new MessageEmbed().setColor("#2f3136");
    let embed3 = new MessageEmbed().setColor("#2f3136");
    let embed4 = new MessageEmbed().setColor("#2f3136");
    let embed5 = new MessageEmbed().setColor("#2f3136");
    let embed6 = new MessageEmbed().setColor("#2f3136");
    let embed7 = new MessageEmbed().setColor("#2f3136");
    let embed8 = new MessageEmbed().setColor("#2f3136");
    let embed9 = new MessageEmbed().setColor("#2f3136");

    if (donatorArray.length === 0) {
      firstEmbed.setFooter({ text: "You can be here: just donate us!" }).setDescription(`There are no users who have donated us. **Be the first!**`);
      embeds.push(firstEmbed);
    } else {
      firstEmbed.setFooter({ text: "You can be here too: just donate us!" });
      var string = "";

      donatorArray.slice(0, 40).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962749152509972>\n`;
      });
      firstEmbed.setDescription(string);
      embeds.push(firstEmbed);
    };

    if (donatorArray.length > 40) {
      var string = "";

      donatorArray.slice(40, 80).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962749152509972>\n`;
      });
      embed2.setDescription(string);
      embeds.push(embed2);
    };
    if (donatorArray.length > 80) {
      var string = "";

      donatorArray.slice(80, 120).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962749152509972>\n`;
      });
      embed3.setDescription(string);
      embeds.push(embed3);
    };
    if (donatorArray.length > 120) {
      var string = "";

      donatorArray.slice(120, 160).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962749152509972>\n`;
      })
      embed4.setDescription(string);
      embeds.push(embed4);
    }
    if (donatorArray.length > 160) {
      var string = "";

      donatorArray.slice(160, 200).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962749152509972>\n`;
      })
      embed5.setDescription(string);
      embeds.push(embed5);
    }
    if (donatorArray.length > 200) {
      var string = "";

      donatorArray.slice(200, 240).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962749152509972>\n`;
      })
      embed6.setDescription(string);
      embeds.push(embed6);
    }
    if (donatorArray.length > 240) {
      var string = "";

      donatorArray.slice(240, 280).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962749152509972>\n`;
      })
      embed7.setDescription(string);
      embeds.push(embed7);
    }
    if (donatorArray.length > 280) {
      var string = "";

      donatorArray.slice(280, 320).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962749152509972>\n`;
      })
      embed8.setDescription(string);
      embeds.push(embed8);
    }
    if (donatorArray.length > 320) {
      var string = "";

      donatorArray.slice(320, 360).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962749152509972>\n`;
      })
      embed9.setDescription(string);
      embeds.push(embed9);
    }
    if (donatorArray.length > 360) {
      var string = "";

      donatorArray.slice(360, 400).forEach((member: any) => {
        string += `• **${member.user.tag}** is a <@&936962749152509972>\n`;
      })
      lastEmbed.setDescription(string);
      embeds.push(lastEmbed);
    };

    webhook?.editMessage("979374651681669211", {
      content: null,
      embeds,
    });
  };

  const updateDatabase = async (premiumMembers: Collection<string, { user: GuildMember | undefined }>, donatorMembers: Collection<string, { user: GuildMember | undefined }>) => {
    const premiumDb = await User.find({ premium: true });
    const donatorDb = await User.find({ donator: true });

    premiumDb.forEach(async (user: any) => {
      if (!premiumMembers.has(user.discordId)) {
        user.premium = false;
        await user.save();
      };
    });

    premiumMembers.forEach(async (member: any) => {
      await User.findOneAndUpdate({
        discordId: member.user.id
      }, {
        discordId: member.user.id,
        premium: true,
      }, {
        upsert: true,
        new: true
      });
    });

    donatorDb.forEach(async (user: any) => {
      if (!donatorMembers.has(user.discordId)) {
        user.donator = false;
        await user.save();
      };
    });

    donatorMembers.forEach(async (member: any) => {
      await User.findOneAndUpdate({
        discordId: member.user.id
      }, {
        discordId: member.user.id,
        donator: true,
      }, {
        upsert: true,
        new: true
      });
    });
  };

  setInterval(async () => {
    const { donatorMembers, premiumMembers } = await getDonatorMembers();
    updateMemberRoles(donatorMembers, premiumMembers);
    updateDonatorMessage(donatorMembers);
    updatePremiumMessage(premiumMembers);
    updateDatabase(premiumMembers, donatorMembers);
  }, 10000);
}