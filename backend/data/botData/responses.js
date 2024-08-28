const botResponses = [
    // Mood and Status
    { responseText: "I am feeling great!", action: "suggest_feedback", intent: "CheckIn", followUpQuestionIndex: null },
    { responseText: "I am a bit stressed.", action: "suggest_help", intent: "CheckIn", followUpQuestionIndex: 1 },
    { responseText: "I have been feeling anxious lately.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: null },
    { responseText: "I am motivated to tackle today’s tasks.", action: "suggest_goals", intent: "DailyMoodCheck", followUpQuestionIndex: null },
    { responseText: "I am feeling a bit overwhelmed.", action: "suggest_workload_review", intent: "CheckIn", followUpQuestionIndex: 3 },
    { responseText: "I am confident about my current projects.", action: "express_support", intent: "WellBeingCheck", followUpQuestionIndex: null },
    { responseText: "I feel well supported by my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null },

    // Emotional Support
    { responseText: "I would appreciate some emotional support.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: null },
    { responseText: "I have some concerns I would like to discuss.", action: "schedule_meeting", intent: "EmotionalSupport", followUpQuestionIndex: null },
    { responseText: "I could use some tips on managing stress.", action: "suggest_stress_management", intent: "EmotionalSupport", followUpQuestionIndex: null },
    { responseText: "Reflecting on my emotions would be helpful.", action: "suggest_reflection", intent: "EmotionalSupport", followUpQuestionIndex: null },

    // Feedback and Reporting
    { responseText: "I would like to provide feedback on a recent project.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: null },
    { responseText: "I have encountered a technical issue.", action: "log_issue", intent: "ReportIssue", followUpQuestionIndex: null },
    { responseText: "I have some suggestions for improving our processes.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
    { responseText: "I am grateful for the support from my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null },
    { responseText: "I have faced a few challenges with my workload.", action: "suggest_workload_review", intent: "ReportChallenge", followUpQuestionIndex: null },
    { responseText: "I would like to share positive feedback about the recent changes.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null },
    { responseText: "I have an idea for improving team collaboration.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
    { responseText: "I think our communication practices could be improved.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: null },

    // Workload and Assistance
    { responseText: "My workload is manageable right now.", action: "acknowledge_response", intent: "CheckIn", followUpQuestionIndex: null },
    { responseText: "I need guidance on a specific task.", action: "schedule_meeting", intent: "RequestGuidance", followUpQuestionIndex: null },
    { responseText: "I could use help with prioritizing my tasks.", action: "provide_prioritization_assistance", intent: "RequestHelp", followUpQuestionIndex: null },
    { responseText: "I don’t have all the resources I need.", action: "request_resources", intent: "RequestSupport", followUpQuestionIndex: null },
    { responseText: "I would like to request additional support on a project.", action: "request_support", intent: "RequestSupport", followUpQuestionIndex: null },

    // Collaboration and Communication
    { responseText: "I am collaborating effectively with my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null },
    { responseText: "I would like to discuss something with a colleague.", action: "schedule_meeting", intent: "RequestMeeting", followUpQuestionIndex: null },
    { responseText: "I think we should schedule a meeting to go over this.", action: "schedule_meeting", intent: "RequestMeeting", followUpQuestionIndex: null },
    { responseText: "I would like to share something with the team.", action: "share_update", intent: "ShareUpdate", followUpQuestionIndex: null },
    { responseText: "I feel communication within the team could be improved.", action: "log_feedback", intent: "ProvideFeedbackOnWork", followUpQuestionIndex: null },
    { responseText: "I would like to collaborate on an upcoming project.", action: "propose_collaboration", intent: "ProposeCollaboration", followUpQuestionIndex: null },

    // Career Development and Feedback
    { responseText: "I would like to discuss my career goals.", action: "schedule_meeting", intent: "DiscussCareerGoals", followUpQuestionIndex: null },
    { responseText: "I would like feedback on my recent performance.", action: "request_feedback", intent: "RequestFeedbackOnPerformance", followUpQuestionIndex: null },
    { responseText: "I am interested in exploring new opportunities.", action: "explore_opportunities", intent: "ExploreNewOpportunities", followUpQuestionIndex: null },
    { responseText: "I would like to discuss career development.", action: "schedule_meeting", intent: "DiscussCareerDevelopment", followUpQuestionIndex: null },
    { responseText: "I have suggestions for skill development.", action: "log_suggestion", intent: "RequestTraining", followUpQuestionIndex: null },
    { responseText: "I have identified a skill gap that needs addressing.", action: "log_feedback", intent: "IdentifySkillGap", followUpQuestionIndex: null },

    // Recognition and Acknowledgment
    { responseText: "I would like to recognize a colleague’s efforts.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null },
    { responseText: "I would like to acknowledge the team’s contributions.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null },
    { responseText: "I would like to celebrate a recent success.", action: "celebrate_achievement", intent: "CelebrateAchievement", followUpQuestionIndex: null },
    { responseText: "I would like to express gratitude towards a colleague.", action: "express_gratitude", intent: "ExpressGratitude", followUpQuestionIndex: null },
    { responseText: "I would like to thank the team for their hard work.", action: "thank_team", intent: "ThankTeam", followUpQuestionIndex: null },

    // Work-Life Balance
    { responseText: "I am managing my work-life balance well.", action: "acknowledge_response", intent: "DiscussWorkLifeBalance", followUpQuestionIndex: null },
    { responseText: "I am concerned about my workload affecting my balance.", action: "discuss_workload", intent: "DiscussWorkload", followUpQuestionIndex: null },
    { responseText: "I need some time off to recharge.", action: "request_time_off", intent: "RequestTimeOff", followUpQuestionIndex: null },
    { responseText: "I would like to discuss flexible work arrangements.", action: "request_flexible_hours", intent: "RequestFlexibleHours", followUpQuestionIndex: null },
    { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },

    // Well-Being and Health
    { responseText: "My overall well-being and health are good.", action: "acknowledge_response", intent: "WellBeingCheck", followUpQuestionIndex: null },
    { responseText: "I have some health-related concerns to discuss.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
    { responseText: "There are work-related factors affecting my health.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
    { responseText: "I need advice on maintaining a healthy work-life balance.", action: "provide_health_advice", intent: "DiscussHealth", followUpQuestionIndex: null },

    // Miscellaneous
    { responseText: "I have something else I'd like to discuss.", action: "schedule_meeting", intent: "SocialChat", followUpQuestionIndex: null },
    { responseText: "I would like to chat about something unrelated to work.", action: "social_chat", intent: "SocialChat", followUpQuestionIndex: null },
    { responseText: "I would like to revisit a previous conversation.", action: "follow_up", intent: "FollowUp", followUpQuestionIndex: null },
    { responseText: "I have some personal concerns I'd like to talk about.", action: "discuss_personal_concerns", intent: "SocialChat", followUpQuestionIndex: null },
    { responseText: "I have a question that hasn't been addressed yet.", action: "seek_clarification", intent: "SeekClarification", followUpQuestionIndex: null },
];

module.exports = botResponses;
