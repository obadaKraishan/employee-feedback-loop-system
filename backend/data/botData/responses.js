const botResponses = [
    // Mood and Status
    { responseText: "I am feeling great!", action: "suggest_feedback", intent: "CheckIn", followUpQuestionIndex: 1 },
    { responseText: "I am a bit stressed.", action: "suggest_help", intent: "CheckIn", followUpQuestionIndex: 2 },
    { responseText: "I have been feeling anxious lately.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: 6 },
    { responseText: "I am motivated to tackle today’s tasks.", action: "suggest_goals", intent: "DailyMoodCheck", followUpQuestionIndex: 10 },
    { responseText: "I am feeling a bit overwhelmed.", action: "suggest_workload_review", intent: "CheckIn", followUpQuestionIndex: 3 },
    { responseText: "I am confident about my current projects.", action: "express_support", intent: "WellBeingCheck", followUpQuestionIndex: 4 },
    { responseText: "I feel well supported by my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: 5 },

    // Emotional Support
    { responseText: "I would appreciate some emotional support.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: 6 },
    { responseText: "I have some concerns I would like to discuss.", action: "schedule_meeting", intent: "EmotionalSupport", followUpQuestionIndex: 7 },
    { responseText: "I could use some tips on managing stress.", action: "suggest_stress_management", intent: "EmotionalSupport", followUpQuestionIndex: 8 },
    { responseText: "Reflecting on my emotions would be helpful.", action: "suggest_reflection", intent: "EmotionalSupport", followUpQuestionIndex: 9 },

    // Feedback and Reporting
    { responseText: "I would like to provide feedback on a recent project.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: 10 },
    { responseText: "I have encountered a technical issue.", action: "log_issue", intent: "ReportIssue", followUpQuestionIndex: 11 },
    { responseText: "I have some suggestions for improving our processes.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: 12 },
    { responseText: "I am grateful for the support from my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: 13 },
    { responseText: "I have faced a few challenges with my workload.", action: "suggest_workload_review", intent: "ReportChallenge", followUpQuestionIndex: 14 },
    { responseText: "I would like to share positive feedback about the recent changes.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: 15 },
    { responseText: "I have an idea for improving team collaboration.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: 16 },
    { responseText: "I think our communication practices could be improved.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: 17 },

    // Workload and Assistance
    { responseText: "My workload is manageable right now.", action: "acknowledge_response", intent: "CheckIn", followUpQuestionIndex: null },
    { responseText: "I need guidance on a specific task.", action: "schedule_meeting", intent: "RequestGuidance", followUpQuestionIndex: 18 },
    { responseText: "I could use help with prioritizing my tasks.", action: "provide_prioritization_assistance", intent: "RequestHelp", followUpQuestionIndex: 19 },
    { responseText: "I don’t have all the resources I need.", action: "request_resources", intent: "RequestSupport", followUpQuestionIndex: 20 },
    { responseText: "I would like to request additional support on a project.", action: "request_support", intent: "RequestSupport", followUpQuestionIndex: 21 },

    // Collaboration and Communication
    { responseText: "I am collaborating effectively with my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: 22 },
    { responseText: "I would like to discuss something with a colleague.", action: "schedule_meeting", intent: "RequestMeeting", followUpQuestionIndex: 23 },
    { responseText: "I think we should schedule a meeting to go over this.", action: "schedule_meeting", intent: "RequestMeeting", followUpQuestionIndex: 24 },
    { responseText: "I would like to share something with the team.", action: "share_update", intent: "ShareUpdate", followUpQuestionIndex: 25 },
    { responseText: "I feel communication within the team could be improved.", action: "log_feedback", intent: "ProvideFeedbackOnWork", followUpQuestionIndex: 26 },
    { responseText: "I would like to collaborate on an upcoming project.", action: "propose_collaboration", intent: "ProposeCollaboration", followUpQuestionIndex: 27 },

    // Career Development and Feedback
    { responseText: "I would like to discuss my career goals.", action: "schedule_meeting", intent: "DiscussCareerGoals", followUpQuestionIndex: 28 },
    { responseText: "I would like feedback on my recent performance.", action: "request_feedback", intent: "RequestFeedbackOnPerformance", followUpQuestionIndex: 29 },
    { responseText: "I am interested in exploring new opportunities.", action: "explore_opportunities", intent: "ExploreNewOpportunities", followUpQuestionIndex: 30 },
    { responseText: "I would like to discuss career development.", action: "schedule_meeting", intent: "DiscussCareerDevelopment", followUpQuestionIndex: 31 },
    { responseText: "I have suggestions for skill development.", action: "log_suggestion", intent: "RequestTraining", followUpQuestionIndex: 32 },
    { responseText: "I have identified a skill gap that needs addressing.", action: "log_feedback", intent: "IdentifySkillGap", followUpQuestionIndex: 33 },

    // Recognition and Acknowledgment
    { responseText: "I would like to recognize a colleague’s efforts.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: 34 },
    { responseText: "I would like to acknowledge the team’s contributions.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: 35 },
    { responseText: "I would like to celebrate a recent success.", action: "celebrate_achievement", intent: "CelebrateAchievement", followUpQuestionIndex: 36 },
    { responseText: "I would like to express gratitude towards a colleague.", action: "express_gratitude", intent: "ExpressGratitude", followUpQuestionIndex: 37 },
    { responseText: "I would like to thank the team for their hard work.", action: "thank_team", intent: "ThankTeam", followUpQuestionIndex: 38 },

    // Work-Life Balance
    { responseText: "I am managing my work-life balance well.", action: "acknowledge_response", intent: "DiscussWorkLifeBalance", followUpQuestionIndex: null },
    { responseText: "I am concerned about my workload affecting my balance.", action: "discuss_workload", intent: "DiscussWorkload", followUpQuestionIndex: 39 },
    { responseText: "I need some time off to recharge.", action: "request_time_off", intent: "RequestTimeOff", followUpQuestionIndex: 40 },
    { responseText: "I would like to discuss flexible work arrangements.", action: "request_flexible_hours", intent: "RequestFlexibleHours", followUpQuestionIndex: 41 },
    { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: 42 },

    // Well-Being and Health
    { responseText: "My overall well-being and health are good.", action: "acknowledge_response", intent: "WellBeingCheck", followUpQuestionIndex: null },
    { responseText: "I have some health-related concerns to discuss.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: 43 },
    { responseText: "There are work-related factors affecting my health.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: 44 },
    { responseText: "I need advice on maintaining a healthy work-life balance.", action: "provide_health_advice", intent: "DiscussHealth", followUpQuestionIndex: 45 },

    // Miscellaneous
    { responseText: "I have something else I'd like to discuss.", action: "schedule_meeting", intent: "SocialChat", followUpQuestionIndex: 46 },
    { responseText: "I would like to chat about something unrelated to work.", action: "social_chat", intent: "SocialChat", followUpQuestionIndex: 47 },
    { responseText: "I would like to revisit a previous conversation.", action: "follow_up", intent: "FollowUp", followUpQuestionIndex: 48 },
    { responseText: "I have some personal concerns I'd like to talk about.", action: "discuss_personal_concerns", intent: "SocialChat", followUpQuestionIndex: 49 },
    { responseText: "I have a question that hasn't been addressed yet.", action: "seek_clarification", intent: "SeekClarification", followUpQuestionIndex: 50 },
];

module.exports = botResponses;
