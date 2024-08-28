const botIntents = [
    // Mood and Status
    { name: "CheckIn", description: "Checking in on the employee’s current mood and status." },
    { name: "EmotionalSupport", description: "Providing emotional support based on the user's current mood." },
    { name: "DailyMoodCheck", description: "Asking the employee about their mood at the start or end of the day." },
    { name: "WellBeingCheck", description: "Inquiring about the employee's overall well-being and health." },

    // Assistance
    { name: "RequestHelp", description: "User is requesting help or assistance." },
    { name: "RequestGuidance", description: "User is asking for guidance on a specific task or decision." },
    { name: "RequestClarification", description: "User is asking for clarification on a specific task or topic." },
    { name: "SeekApproval", description: "User is seeking approval for a decision or action." },
    { name: "RequestSupport", description: "User is requesting additional support or resources." },
    { name: "EscalateIssue", description: "User is escalating an issue to higher management." },

    // Feedback and Reporting
    { name: "ProvideFeedback", description: "User is providing feedback on a specific topic." },
    { name: "ReportIssue", description: "User is reporting an issue or concern." },
    { name: "ExpressGratitude", description: "User is expressing gratitude or appreciation." },
    { name: "ReportProgress", description: "User is reporting progress on a task or project." },
    { name: "ReportSuccess", description: "User is reporting a successful outcome or achievement." },
    { name: "ReportChallenge", description: "User is reporting a challenge or obstacle." },
    { name: "ProvideSuggestion", description: "User is providing a suggestion for improvement or change." },
    { name: "RaiseConcern", description: "User is raising a concern about a process, decision, or task." },
    { name: "GiveConstructiveFeedback", description: "User is providing constructive feedback to improve a process or outcome." },
    { name: "RequestStatusUpdate", description: "User is requesting a status update on a task or project." },

    // Improvement and Learning
    { name: "SuggestImprovement", description: "User is suggesting an improvement or change." },
    { name: "RequestTraining", description: "User is requesting training or skill development." },
    { name: "RequestResources", description: "User is requesting additional resources or tools." },
    { name: "RequestMentorship", description: "User is requesting mentorship or guidance." },
    { name: "ShareLearning", description: "User is sharing new knowledge or learning with others." },
    { name: "RequestFeedbackOnImprovement", description: "User is requesting feedback on a suggested improvement." },
    { name: "ProposeNewIdea", description: "User is proposing a new idea or initiative for consideration." },
    { name: "OfferTraining", description: "User is offering to provide training or guidance to others." },
    { name: "IdentifySkillGap", description: "User is identifying a skill gap that needs to be addressed." },
    
    // Communication and Collaboration
    { name: "SocialChat", description: "Engaging in casual or social conversation." },
    { name: "RequestMeeting", description: "User is requesting a meeting or discussion." },
    { name: "ScheduleMeeting", description: "User is scheduling a meeting or follow-up." },
    { name: "ShareUpdate", description: "User is sharing an update on a task or project." },
    { name: "Collaborate", description: "User is seeking collaboration on a task or project." },
    { name: "ProvideFeedbackOnWork", description: "User is providing feedback on a colleague's work or performance." },
    { name: "ProposeCollaboration", description: "User is proposing a collaboration on a task or project." },
    { name: "InviteToDiscussion", description: "User is inviting others to join a discussion or meeting." },
    { name: "FollowUp", description: "User is following up on a previous discussion or task." },

    // Work-Life Balance
    { name: "DiscussWorkLifeBalance", description: "User is discussing work-life balance issues or concerns." },
    { name: "RequestTimeOff", description: "User is requesting time off or a break." },
    { name: "DiscussWorkload", description: "User is discussing their current workload and seeking adjustments." },
    { name: "ManageStress", description: "User is seeking advice or support on managing stress." },
    { name: "RequestFlexibleHours", description: "User is requesting flexible working hours or remote work." },
    { name: "BalanceWorkPersonalLife", description: "User is discussing strategies to balance work and personal life." },
    { name: "DiscussHealth", description: "User is discussing health-related concerns that impact work." },

    // Recognition and Acknowledgment
    { name: "GiveRecognition", description: "User is giving recognition or praise to a colleague." },
    { name: "AcknowledgeEffort", description: "User is acknowledging the effort or contribution of others." },
    { name: "CelebrateAchievement", description: "User is celebrating a significant achievement or milestone." },
    { name: "ThankTeam", description: "User is thanking the team for their hard work and dedication." },
    { name: "EncourageOthers", description: "User is encouraging others to keep up the good work." },

    // Career Development
    { name: "DiscussCareerGoals", description: "User is discussing career goals or aspirations." },
    { name: "RequestPromotion", description: "User is requesting a promotion or career advancement." },
    { name: "RequestFeedbackOnPerformance", description: "User is requesting feedback on their own performance." },
    { name: "DiscussCareerDevelopment", description: "User is discussing opportunities for career development." },
    { name: "ExploreNewOpportunities", description: "User is exploring new career opportunities within the organization." },
    { name: "RequestMentorshipForCareer", description: "User is requesting mentorship specifically for career development." },
    { name: "SetCareerGoals", description: "User is setting career goals and planning steps to achieve them." },

    // Other
    { name: "ExpressConcern", description: "User is expressing concern about a particular issue." },
    { name: "ExpressSatisfaction", description: "User is expressing satisfaction with a current situation or outcome." },
    { name: "ExpressDiscontent", description: "User is expressing discontent or dissatisfaction." },
    { name: "ExpressNeutrality", description: "User is expressing neutrality or indifference on a topic." },
    { name: "RequestPrivacy", description: "User is requesting privacy or confidentiality in a matter." },
    { name: "SeekClarification", description: "User is seeking clarification on a decision, policy, or action." },
    { name: "DiscussCompanyCulture", description: "User is discussing aspects of the company culture." },
    { name: "VoiceOpinion", description: "User is voicing their opinion on a specific matter." },
    { name: "ExpressOptimism", description: "User is expressing optimism about the future." },
];

module.exports = botIntents;
