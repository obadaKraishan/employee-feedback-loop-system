const botQuestions = [
    // Mood and Status
    {
        questionText: "How are you feeling today?",
        possibleResponses: [
            { responseText: "I am feeling great!", action: "suggest_feedback", intent: "CheckIn", followUpQuestionIndex: 2 },
            { responseText: "I am a bit stressed.", action: "suggest_help", intent: "CheckIn", followUpQuestionIndex: 1 },
            { responseText: "I have been feeling anxious lately.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: 4 }
        ]
    },
    {
        questionText: "Have you been feeling stressed or overwhelmed recently?",
        possibleResponses: [
            { responseText: "I am a bit stressed.", action: "suggest_help", intent: "CheckIn", followUpQuestionIndex: 1 },
            { responseText: "I have been feeling anxious lately.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "I am feeling a bit overwhelmed.", action: "suggest_workload_review", intent: "CheckIn", followUpQuestionIndex: 3 }
        ]
    },
    {
        questionText: "Is there anything on your mind that you would like to discuss?",
        possibleResponses: [
            { responseText: "I have some concerns I would like to discuss.", action: "schedule_meeting", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "I have a question that hasn't been addressed yet.", action: "seek_clarification", intent: "SeekClarification", followUpQuestionIndex: null },
            { responseText: "I would like to revisit a previous conversation.", action: "follow_up", intent: "FollowUp", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "How would you describe your mood at the start of the day?",
        possibleResponses: [
            { responseText: "I am feeling great!", action: "suggest_feedback", intent: "CheckIn", followUpQuestionIndex: null },
            { responseText: "I am motivated to tackle today’s tasks.", action: "suggest_goals", intent: "DailyMoodCheck", followUpQuestionIndex: null },
            { responseText: "I am a bit stressed.", action: "suggest_help", intent: "CheckIn", followUpQuestionIndex: 1 }
        ]
    },
    {
        questionText: "Have you noticed any changes in your mood recently?",
        possibleResponses: [
            { responseText: "I have been feeling anxious lately.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "I am feeling a bit overwhelmed.", action: "suggest_workload_review", intent: "CheckIn", followUpQuestionIndex: 3 },
            { responseText: "I am feeling great!", action: "suggest_feedback", intent: "CheckIn", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are you satisfied with how your day is going so far?",
        possibleResponses: [
            { responseText: "I am motivated to tackle today’s tasks.", action: "suggest_goals", intent: "DailyMoodCheck", followUpQuestionIndex: null },
            { responseText: "I am feeling great!", action: "suggest_feedback", intent: "CheckIn", followUpQuestionIndex: null },
            { responseText: "I feel well supported by my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you feel motivated to tackle your tasks today?",
        possibleResponses: [
            { responseText: "I am motivated to tackle today’s tasks.", action: "suggest_goals", intent: "DailyMoodCheck", followUpQuestionIndex: null },
            { responseText: "I am a bit stressed.", action: "suggest_help", intent: "CheckIn", followUpQuestionIndex: 1 },
            { responseText: "I am feeling a bit overwhelmed.", action: "suggest_workload_review", intent: "CheckIn", followUpQuestionIndex: 3 }
        ]
    },
    {
        questionText: "How have you been sleeping lately? Has it affected your mood?",
        possibleResponses: [
            { responseText: "I have been feeling anxious lately.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "I am feeling a bit overwhelmed.", action: "suggest_workload_review", intent: "CheckIn", followUpQuestionIndex: 3 },
            { responseText: "I am a bit stressed.", action: "suggest_help", intent: "CheckIn", followUpQuestionIndex: 1 }
        ]
    },
    {
        questionText: "Do you feel supported by your colleagues and managers?",
        possibleResponses: [
            { responseText: "I feel well supported by my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null },
            { responseText: "I am grateful for the support from my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null },
            { responseText: "I am a bit stressed.", action: "suggest_help", intent: "CheckIn", followUpQuestionIndex: 1 }
        ]
    },
    {
        questionText: "Are you feeling confident about your current projects?",
        possibleResponses: [
            { responseText: "I am confident about my current projects.", action: "express_support", intent: "WellBeingCheck", followUpQuestionIndex: null },
            { responseText: "I feel well supported by my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null },
            { responseText: "I am motivated to tackle today’s tasks.", action: "suggest_goals", intent: "DailyMoodCheck", followUpQuestionIndex: null }
        ]
    },

    // Emotional Support
    {
        questionText: "Is there anything I can do to support you emotionally?",
        possibleResponses: [
            { responseText: "I would appreciate some emotional support.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "I have some concerns I would like to discuss.", action: "schedule_meeting", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "Reflecting on my emotions would be helpful.", action: "suggest_reflection", intent: "EmotionalSupport", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to talk about any concerns or worries?",
        possibleResponses: [
            { responseText: "I have some concerns I would like to discuss.", action: "schedule_meeting", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "I have a question that hasn't been addressed yet.", action: "seek_clarification", intent: "SeekClarification", followUpQuestionIndex: null },
            { responseText: "I would appreciate some emotional support.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "How can I help you feel more at ease?",
        possibleResponses: [
            { responseText: "I would appreciate some emotional support.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "Reflecting on my emotions would be helpful.", action: "suggest_reflection", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "I could use some tips on managing stress.", action: "suggest_stress_management", intent: "EmotionalSupport", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like some tips on managing stress or anxiety?",
        possibleResponses: [
            { responseText: "I could use some tips on managing stress.", action: "suggest_stress_management", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "Reflecting on my emotions would be helpful.", action: "suggest_reflection", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "I have been feeling anxious lately.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Is there anything that's been bothering you lately?",
        possibleResponses: [
            { responseText: "I have some concerns I would like to discuss.", action: "schedule_meeting", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "I would appreciate some emotional support.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "Reflecting on my emotions would be helpful.", action: "suggest_reflection", intent: "EmotionalSupport", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you feel like you're able to manage your stress levels effectively?",
        possibleResponses: [
            { responseText: "I am a bit stressed.", action: "suggest_help", intent: "CheckIn", followUpQuestionIndex: 1 },
            { responseText: "I have been feeling anxious lately.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "I am feeling a bit overwhelmed.", action: "suggest_workload_review", intent: "CheckIn", followUpQuestionIndex: 3 }
        ]
    },
    {
        questionText: "Would you like to discuss ways to improve your emotional well-being?",
        possibleResponses: [
            { responseText: "I could use some tips on managing stress.", action: "suggest_stress_management", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "Reflecting on my emotions would be helpful.", action: "suggest_reflection", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "I would appreciate some emotional support.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any personal issues you'd like to talk about?",
        possibleResponses: [
            { responseText: "I have some concerns I would like to discuss.", action: "schedule_meeting", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "I have a question that hasn't been addressed yet.", action: "seek_clarification", intent: "SeekClarification", followUpQuestionIndex: null },
            { responseText: "I have some personal concerns I'd like to talk about.", action: "discuss_personal_concerns", intent: "SocialChat", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would it be helpful to take a moment to reflect on your emotions?",
        possibleResponses: [
            { responseText: "Reflecting on my emotions would be helpful.", action: "suggest_reflection", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "I would appreciate some emotional support.", action: "provide_emotional_support", intent: "EmotionalSupport", followUpQuestionIndex: null },
            { responseText: "I could use some tips on managing stress.", action: "suggest_stress_management", intent: "EmotionalSupport", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you feel like you have a good work-life balance?",
        possibleResponses: [
            { responseText: "I am managing my work-life balance well.", action: "acknowledge_response", intent: "DiscussWorkLifeBalance", followUpQuestionIndex: null },
            { responseText: "I am concerned about my workload affecting my balance.", action: "discuss_workload", intent: "DiscussWorkload", followUpQuestionIndex: null },
            { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null }
        ]
    },

    // Feedback and Reporting
    {
        questionText: "Would you like to provide any feedback on a recent project?",
        possibleResponses: [
            { responseText: "I would like to provide feedback on a recent project.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: null },
            { responseText: "I have some suggestions for improving our processes.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
            { responseText: "I have an idea for improving team collaboration.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Is there anything you think could be improved in our processes?",
        possibleResponses: [
            { responseText: "I have some suggestions for improving our processes.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
            { responseText: "I think our communication practices could be improved.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: null },
            { responseText: "I have an idea for improving team collaboration.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you have any suggestions for making your work environment better?",
        possibleResponses: [
            { responseText: "I have some suggestions for improving our processes.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
            { responseText: "I have an idea for improving team collaboration.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
            { responseText: "I would like to provide feedback on a recent project.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any challenges you're currently facing that you'd like to discuss?",
        possibleResponses: [
            { responseText: "I have faced a few challenges with my workload.", action: "suggest_workload_review", intent: "ReportChallenge", followUpQuestionIndex: null },
            { responseText: "I need guidance on a specific task.", action: "schedule_meeting", intent: "RequestGuidance", followUpQuestionIndex: null },
            { responseText: "I have encountered a technical issue.", action: "log_issue", intent: "ReportIssue", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "How is your current workload? Do you need any assistance?",
        possibleResponses: [
            { responseText: "My workload is manageable right now.", action: "acknowledge_response", intent: "CheckIn", followUpQuestionIndex: null },
            { responseText: "I could use help with prioritizing my tasks.", action: "provide_prioritization_assistance", intent: "RequestHelp", followUpQuestionIndex: null },
            { responseText: "I need guidance on a specific task.", action: "schedule_meeting", intent: "RequestGuidance", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Have you encountered any issues that need to be reported?",
        possibleResponses: [
            { responseText: "I have encountered a technical issue.", action: "log_issue", intent: "ReportIssue", followUpQuestionIndex: null },
            { responseText: "I have faced a few challenges with my workload.", action: "suggest_workload_review", intent: "ReportChallenge", followUpQuestionIndex: null },
            { responseText: "I have some suggestions for improving our processes.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to share any positive feedback or express gratitude?",
        possibleResponses: [
            { responseText: "I am grateful for the support from my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null },
            { responseText: "I would like to recognize a colleague’s efforts.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null },
            { responseText: "I would like to share positive feedback about the recent changes.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any specific areas where you feel we could improve?",
        possibleResponses: [
            { responseText: "I have some suggestions for improving our processes.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
            { responseText: "I think our communication practices could be improved.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: null },
            { responseText: "I have an idea for improving team collaboration.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you have any thoughts on how we can enhance team collaboration?",
        possibleResponses: [
            { responseText: "I have an idea for improving team collaboration.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
            { responseText: "I would like to collaborate on an upcoming project.", action: "propose_collaboration", intent: "ProposeCollaboration", followUpQuestionIndex: null },
            { responseText: "I would like to share something with the team.", action: "share_update", intent: "ShareUpdate", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to provide feedback on the recent changes in our processes?",
        possibleResponses: [
            { responseText: "I would like to share positive feedback about the recent changes.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null },
            { responseText: "I have some suggestions for improving our processes.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
            { responseText: "I think our communication practices could be improved.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any new ideas you'd like to share with the team?",
        possibleResponses: [
            { responseText: "I have an idea for improving team collaboration.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
            { responseText: "I have some suggestions for improving our processes.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
            { responseText: "I would like to provide feedback on a recent project.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Is there anything specific you'd like to report regarding recent projects?",
        possibleResponses: [
            { responseText: "I have encountered a technical issue.", action: "log_issue", intent: "ReportIssue", followUpQuestionIndex: null },
            { responseText: "I have faced a few challenges with my workload.", action: "suggest_workload_review", intent: "ReportChallenge", followUpQuestionIndex: null },
            { responseText: "I have some suggestions for improving our processes.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to give feedback on our current communication practices?",
        possibleResponses: [
            { responseText: "I think our communication practices could be improved.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: null },
            { responseText: "I would like to provide feedback on a recent project.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: null },
            { responseText: "I have an idea for improving team collaboration.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you feel like your feedback is valued and acted upon?",
        possibleResponses: [
            { responseText: "I think our communication practices could be improved.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: null },
            { responseText: "I have some suggestions for improving our processes.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
            { responseText: "I would like to provide feedback on a recent project.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: null }
        ]
    },

    // Workload and Assistance
    {
        questionText: "Is your workload manageable, or do you need help?",
        possibleResponses: [
            { responseText: "My workload is manageable right now.", action: "acknowledge_response", intent: "CheckIn", followUpQuestionIndex: null },
            { responseText: "I could use help with prioritizing my tasks.", action: "provide_prioritization_assistance", intent: "RequestHelp", followUpQuestionIndex: null },
            { responseText: "I need guidance on a specific task.", action: "schedule_meeting", intent: "RequestGuidance", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any tasks you're struggling with that you need guidance on?",
        possibleResponses: [
            { responseText: "I need guidance on a specific task.", action: "schedule_meeting", intent: "RequestGuidance", followUpQuestionIndex: null },
            { responseText: "I have encountered a technical issue.", action: "log_issue", intent: "ReportIssue", followUpQuestionIndex: null },
            { responseText: "I could use help with prioritizing my tasks.", action: "provide_prioritization_assistance", intent: "RequestHelp", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like assistance with prioritizing your tasks?",
        possibleResponses: [
            { responseText: "I could use help with prioritizing my tasks.", action: "provide_prioritization_assistance", intent: "RequestHelp", followUpQuestionIndex: null },
            { responseText: "I need guidance on a specific task.", action: "schedule_meeting", intent: "RequestGuidance", followUpQuestionIndex: null },
            { responseText: "My workload is manageable right now.", action: "acknowledge_response", intent: "CheckIn", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you have all the resources you need to complete your tasks?",
        possibleResponses: [
            { responseText: "I don’t have all the resources I need.", action: "request_resources", intent: "RequestSupport", followUpQuestionIndex: null },
            { responseText: "I would like to request additional support on a project.", action: "request_support", intent: "RequestSupport", followUpQuestionIndex: null },
            { responseText: "My workload is manageable right now.", action: "acknowledge_response", intent: "CheckIn", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to request additional support on any ongoing projects?",
        possibleResponses: [
            { responseText: "I would like to request additional support on a project.", action: "request_support", intent: "RequestSupport", followUpQuestionIndex: null },
            { responseText: "I don’t have all the resources I need.", action: "request_resources", intent: "RequestSupport", followUpQuestionIndex: null },
            { responseText: "I need guidance on a specific task.", action: "schedule_meeting", intent: "RequestGuidance", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any deadlines you're worried about meeting?",
        possibleResponses: [
            { responseText: "I have faced a few challenges with my workload.", action: "suggest_workload_review", intent: "ReportChallenge", followUpQuestionIndex: null },
            { responseText: "I could use help with prioritizing my tasks.", action: "provide_prioritization_assistance", intent: "RequestHelp", followUpQuestionIndex: null },
            { responseText: "I would like to request additional support on a project.", action: "request_support", intent: "RequestSupport", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would it be helpful to review your workload together?",
        possibleResponses: [
            { responseText: "I have faced a few challenges with my workload.", action: "suggest_workload_review", intent: "ReportChallenge", followUpQuestionIndex: null },
            { responseText: "I could use help with prioritizing my tasks.", action: "provide_prioritization_assistance", intent: "RequestHelp", followUpQuestionIndex: null },
            { responseText: "I would like to request additional support on a project.", action: "request_support", intent: "RequestSupport", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you feel like you have enough time to complete your tasks?",
        possibleResponses: [
            { responseText: "My workload is manageable right now.", action: "acknowledge_response", intent: "CheckIn", followUpQuestionIndex: null },
            { responseText: "I could use help with prioritizing my tasks.", action: "provide_prioritization_assistance", intent: "RequestHelp", followUpQuestionIndex: null },
            { responseText: "I need guidance on a specific task.", action: "schedule_meeting", intent: "RequestGuidance", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any tasks you'd like to delegate or reassign?",
        possibleResponses: [
            { responseText: "I need guidance on a specific task.", action: "schedule_meeting", intent: "RequestGuidance", followUpQuestionIndex: null },
            { responseText: "I would like to request additional support on a project.", action: "request_support", intent: "RequestSupport", followUpQuestionIndex: null },
            { responseText: "I don’t have all the resources I need.", action: "request_resources", intent: "RequestSupport", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to discuss strategies for managing your workload more effectively?",
        possibleResponses: [
            { responseText: "I could use help with prioritizing my tasks.", action: "provide_prioritization_assistance", intent: "RequestHelp", followUpQuestionIndex: null },
            { responseText: "I need guidance on a specific task.", action: "schedule_meeting", intent: "RequestGuidance", followUpQuestionIndex: null },
            { responseText: "I would like to request additional support on a project.", action: "request_support", intent: "RequestSupport", followUpQuestionIndex: null }
        ]
    },

    // Collaboration and Communication
    {
        questionText: "Are you collaborating effectively with your team?",
        possibleResponses: [
            { responseText: "I am collaborating effectively with my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null },
            { responseText: "I think our communication practices could be improved.", action: "log_feedback", intent: "ProvideFeedbackOnWork", followUpQuestionIndex: null },
            { responseText: "I would like to collaborate on an upcoming project.", action: "propose_collaboration", intent: "ProposeCollaboration", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Is there anyone you'd like to have a discussion with?",
        possibleResponses: [
            { responseText: "I would like to discuss something with a colleague.", action: "schedule_meeting", intent: "RequestMeeting", followUpQuestionIndex: null },
            { responseText: "I think we should schedule a meeting to go over this.", action: "schedule_meeting", intent: "RequestMeeting", followUpQuestionIndex: null },
            { responseText: "I would like to share something with the team.", action: "share_update", intent: "ShareUpdate", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to schedule a meeting to discuss any topics in detail?",
        possibleResponses: [
            { responseText: "I think we should schedule a meeting to go over this.", action: "schedule_meeting", intent: "RequestMeeting", followUpQuestionIndex: null },
            { responseText: "I would like to discuss something with a colleague.", action: "schedule_meeting", intent: "RequestMeeting", followUpQuestionIndex: null },
            { responseText: "I need guidance on a specific task.", action: "schedule_meeting", intent: "RequestGuidance", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Is there anything you'd like to share with your colleagues?",
        possibleResponses: [
            { responseText: "I would like to share something with the team.", action: "share_update", intent: "ShareUpdate", followUpQuestionIndex: null },
            { responseText: "I am grateful for the support from my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null },
            { responseText: "I have an idea for improving team collaboration.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you feel that communication within the team could be improved?",
        possibleResponses: [
            { responseText: "I think our communication practices could be improved.", action: "log_feedback", intent: "ProvideFeedbackOnWork", followUpQuestionIndex: null },
            { responseText: "I would like to provide feedback on a recent project.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: null },
            { responseText: "I have some suggestions for improving our processes.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to collaborate on any upcoming projects?",
        possibleResponses: [
            { responseText: "I would like to collaborate on an upcoming project.", action: "propose_collaboration", intent: "ProposeCollaboration", followUpQuestionIndex: null },
            { responseText: "I have an idea for improving team collaboration.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
            { responseText: "I would like to discuss something with a colleague.", action: "schedule_meeting", intent: "RequestMeeting", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any communication barriers you'd like to address?",
        possibleResponses: [
            { responseText: "I think our communication practices could be improved.", action: "log_feedback", intent: "ProvideFeedbackOnWork", followUpQuestionIndex: null },
            { responseText: "I would like to provide feedback on a recent project.", action: "log_feedback", intent: "ProvideFeedback", followUpQuestionIndex: null },
            { responseText: "I would like to collaborate on an upcoming project.", action: "propose_collaboration", intent: "ProposeCollaboration", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to set up regular check-ins with your team?",
        possibleResponses: [
            { responseText: "I would like to discuss something with a colleague.", action: "schedule_meeting", intent: "RequestMeeting", followUpQuestionIndex: null },
            { responseText: "I think we should schedule a meeting to go over this.", action: "schedule_meeting", intent: "RequestMeeting", followUpQuestionIndex: null },
            { responseText: "I am collaborating effectively with my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you feel like you're getting enough feedback from your team?",
        possibleResponses: [
            { responseText: "I would like feedback on my recent performance.", action: "request_feedback", intent: "RequestFeedbackOnPerformance", followUpQuestionIndex: null },
            { responseText: "I think our communication practices could be improved.", action: "log_feedback", intent: "ProvideFeedbackOnWork", followUpQuestionIndex: null },
            { responseText: "I am collaborating effectively with my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to discuss ways to improve team collaboration?",
        possibleResponses: [
            { responseText: "I have an idea for improving team collaboration.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
            { responseText: "I would like to collaborate on an upcoming project.", action: "propose_collaboration", intent: "ProposeCollaboration", followUpQuestionIndex: null },
            { responseText: "I think our communication practices could be improved.", action: "log_feedback", intent: "ProvideFeedbackOnWork", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any team dynamics that you're concerned about?",
        possibleResponses: [
            { responseText: "I think our communication practices could be improved.", action: "log_feedback", intent: "ProvideFeedbackOnWork", followUpQuestionIndex: null },
            { responseText: "I would like to collaborate on an upcoming project.", action: "propose_collaboration", intent: "ProposeCollaboration", followUpQuestionIndex: null },
            { responseText: "I have an idea for improving team collaboration.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to explore opportunities for cross-team collaboration?",
        possibleResponses: [
            { responseText: "I would like to collaborate on an upcoming project.", action: "propose_collaboration", intent: "ProposeCollaboration", followUpQuestionIndex: null },
            { responseText: "I have an idea for improving team collaboration.", action: "log_suggestion", intent: "ProvideSuggestion", followUpQuestionIndex: null },
            { responseText: "I think our communication practices could be improved.", action: "log_feedback", intent: "ProvideFeedbackOnWork", followUpQuestionIndex: null }
        ]
    },

    // Career Development and Feedback
    {
        questionText: "Would you like to discuss your career goals or aspirations?",
        possibleResponses: [
            { responseText: "I would like to discuss my career goals.", action: "schedule_meeting", intent: "DiscussCareerGoals", followUpQuestionIndex: null },
            { responseText: "I would like to explore new opportunities within the organization.", action: "explore_opportunities", intent: "ExploreNewOpportunities", followUpQuestionIndex: null },
            { responseText: "I would like to discuss career development.", action: "schedule_meeting", intent: "DiscussCareerDevelopment", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you have any feedback on your recent performance?",
        possibleResponses: [
            { responseText: "I would like feedback on my recent performance.", action: "request_feedback", intent: "RequestFeedbackOnPerformance", followUpQuestionIndex: null },
            { responseText: "I have identified a skill gap that needs addressing.", action: "log_feedback", intent: "IdentifySkillGap", followUpQuestionIndex: null },
            { responseText: "I would like to explore new opportunities within the organization.", action: "explore_opportunities", intent: "ExploreNewOpportunities", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to explore new opportunities within the organization?",
        possibleResponses: [
            { responseText: "I would like to explore new opportunities within the organization.", action: "explore_opportunities", intent: "ExploreNewOpportunities", followUpQuestionIndex: null },
            { responseText: "I would like to discuss my career goals.", action: "schedule_meeting", intent: "DiscussCareerGoals", followUpQuestionIndex: null },
            { responseText: "I would like to discuss career development.", action: "schedule_meeting", intent: "DiscussCareerDevelopment", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Is there anything you’d like to discuss regarding your career development?",
        possibleResponses: [
            { responseText: "I would like to discuss career development.", action: "schedule_meeting", intent: "DiscussCareerDevelopment", followUpQuestionIndex: null },
            { responseText: "I would like to discuss my career goals.", action: "schedule_meeting", intent: "DiscussCareerGoals", followUpQuestionIndex: null },
            { responseText: "I would like to explore new opportunities within the organization.", action: "explore_opportunities", intent: "ExploreNewOpportunities", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you have any suggestions for skill development or training?",
        possibleResponses: [
            { responseText: "I have suggestions for skill development.", action: "log_suggestion", intent: "RequestTraining", followUpQuestionIndex: null },
            { responseText: "I have identified a skill gap that needs addressing.", action: "log_feedback", intent: "IdentifySkillGap", followUpQuestionIndex: null },
            { responseText: "I would like feedback on my recent performance.", action: "request_feedback", intent: "RequestFeedbackOnPerformance", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to discuss your long-term career goals?",
        possibleResponses: [
            { responseText: "I would like to discuss my career goals.", action: "schedule_meeting", intent: "DiscussCareerGoals", followUpQuestionIndex: null },
            { responseText: "I would like to discuss career development.", action: "schedule_meeting", intent: "DiscussCareerDevelopment", followUpQuestionIndex: null },
            { responseText: "I would like to explore new opportunities within the organization.", action: "explore_opportunities", intent: "ExploreNewOpportunities", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any skills you'd like to develop further?",
        possibleResponses: [
            { responseText: "I have suggestions for skill development.", action: "log_suggestion", intent: "RequestTraining", followUpQuestionIndex: null },
            { responseText: "I have identified a skill gap that needs addressing.", action: "log_feedback", intent: "IdentifySkillGap", followUpQuestionIndex: null },
            { responseText: "I would like feedback on my recent performance.", action: "request_feedback", intent: "RequestFeedbackOnPerformance", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like feedback on your recent work?",
        possibleResponses: [
            { responseText: "I would like feedback on my recent performance.", action: "request_feedback", intent: "RequestFeedbackOnPerformance", followUpQuestionIndex: null },
            { responseText: "I would like to discuss career development.", action: "schedule_meeting", intent: "DiscussCareerDevelopment", followUpQuestionIndex: null },
            { responseText: "I would like to explore new opportunities within the organization.", action: "explore_opportunities", intent: "ExploreNewOpportunities", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you feel like you have a clear path for career advancement?",
        possibleResponses: [
            { responseText: "I would like to discuss my career goals.", action: "schedule_meeting", intent: "DiscussCareerGoals", followUpQuestionIndex: null },
            { responseText: "I would like to discuss career development.", action: "schedule_meeting", intent: "DiscussCareerDevelopment", followUpQuestionIndex: null },
            { responseText: "I would like to explore new opportunities within the organization.", action: "explore_opportunities", intent: "ExploreNewOpportunities", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to explore potential career opportunities?",
        possibleResponses: [
            { responseText: "I would like to explore new opportunities within the organization.", action: "explore_opportunities", intent: "ExploreNewOpportunities", followUpQuestionIndex: null },
            { responseText: "I would like to discuss career development.", action: "schedule_meeting", intent: "DiscussCareerDevelopment", followUpQuestionIndex: null },
            { responseText: "I would like to discuss my career goals.", action: "schedule_meeting", intent: "DiscussCareerGoals", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any mentorship opportunities you're interested in?",
        possibleResponses: [
            { responseText: "I would like to explore new opportunities within the organization.", action: "explore_opportunities", intent: "ExploreNewOpportunities", followUpQuestionIndex: null },
            { responseText: "I would like to discuss my career goals.", action: "schedule_meeting", intent: "DiscussCareerGoals", followUpQuestionIndex: null },
            { responseText: "I would like feedback on my recent performance.", action: "request_feedback", intent: "RequestFeedbackOnPerformance", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to discuss opportunities for professional growth?",
        possibleResponses: [
            { responseText: "I would like to explore new opportunities within the organization.", action: "explore_opportunities", intent: "ExploreNewOpportunities", followUpQuestionIndex: null },
            { responseText: "I would like to discuss my career goals.", action: "schedule_meeting", intent: "DiscussCareerGoals", followUpQuestionIndex: null },
            { responseText: "I would like feedback on my recent performance.", action: "request_feedback", intent: "RequestFeedbackOnPerformance", followUpQuestionIndex: null }
        ]
    },

    // Recognition and Acknowledgment
    {
        questionText: "Is there someone you would like to recognize for their efforts?",
        possibleResponses: [
            { responseText: "I would like to recognize a colleague’s efforts.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null },
            { responseText: "I would like to acknowledge the team’s contributions.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null },
            { responseText: "I am grateful for the support from my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to acknowledge the contributions of your colleagues?",
        possibleResponses: [
            { responseText: "I would like to acknowledge the team’s contributions.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null },
            { responseText: "I would like to recognize a colleague’s efforts.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null },
            { responseText: "I would like to express gratitude towards a colleague.", action: "express_gratitude", intent: "ExpressGratitude", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Is there a recent success you'd like to celebrate?",
        possibleResponses: [
            { responseText: "I would like to celebrate a recent success.", action: "celebrate_achievement", intent: "CelebrateAchievement", followUpQuestionIndex: null },
            { responseText: "I would like to recognize a colleague’s efforts.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null },
            { responseText: "I would like to express gratitude towards a colleague.", action: "express_gratitude", intent: "ExpressGratitude", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to express gratitude towards anyone?",
        possibleResponses: [
            { responseText: "I would like to express gratitude towards a colleague.", action: "express_gratitude", intent: "ExpressGratitude", followUpQuestionIndex: null },
            { responseText: "I would like to thank the team for their hard work.", action: "thank_team", intent: "ThankTeam", followUpQuestionIndex: null },
            { responseText: "I would like to recognize a colleague’s efforts.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Is there a team member who has gone above and beyond recently?",
        possibleResponses: [
            { responseText: "I would like to recognize a colleague’s efforts.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null },
            { responseText: "I would like to acknowledge the team’s contributions.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null },
            { responseText: "I would like to express gratitude towards a colleague.", action: "express_gratitude", intent: "ExpressGratitude", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to recognize the hard work of your team?",
        possibleResponses: [
            { responseText: "I would like to acknowledge the team’s contributions.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null },
            { responseText: "I would like to thank the team for their hard work.", action: "thank_team", intent: "ThankTeam", followUpQuestionIndex: null },
            { responseText: "I would like to express gratitude towards a colleague.", action: "express_gratitude", intent: "ExpressGratitude", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any accomplishments you'd like to highlight?",
        possibleResponses: [
            { responseText: "I would like to recognize a colleague’s efforts.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null },
            { responseText: "I would like to celebrate a recent success.", action: "celebrate_achievement", intent: "CelebrateAchievement", followUpQuestionIndex: null },
            { responseText: "I would like to express gratitude towards a colleague.", action: "express_gratitude", intent: "ExpressGratitude", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to express appreciation for a colleague's support?",
        possibleResponses: [
            { responseText: "I would like to express gratitude towards a colleague.", action: "express_gratitude", intent: "ExpressGratitude", followUpQuestionIndex: null },
            { responseText: "I would like to recognize a colleague’s efforts.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null },
            { responseText: "I would like to acknowledge the team’s contributions.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Is there anyone you'd like to thank for their dedication?",
        possibleResponses: [
            { responseText: "I would like to thank the team for their hard work.", action: "thank_team", intent: "ThankTeam", followUpQuestionIndex: null },
            { responseText: "I would like to express gratitude towards a colleague.", action: "express_gratitude", intent: "ExpressGratitude", followUpQuestionIndex: null },
            { responseText: "I would like to recognize a colleague’s efforts.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to celebrate any recent achievements?",
        possibleResponses: [
            { responseText: "I would like to celebrate a recent success.", action: "celebrate_achievement", intent: "CelebrateAchievement", followUpQuestionIndex: null },
            { responseText: "I would like to express gratitude towards a colleague.", action: "express_gratitude", intent: "ExpressGratitude", followUpQuestionIndex: null },
            { responseText: "I would like to recognize a colleague’s efforts.", action: "give_recognition", intent: "GiveRecognition", followUpQuestionIndex: null }
        ]
    },

    // Work-Life Balance
    {
        questionText: "How are you managing your work-life balance?",
        possibleResponses: [
            { responseText: "I am managing my work-life balance well.", action: "acknowledge_response", intent: "DiscussWorkLifeBalance", followUpQuestionIndex: null },
            { responseText: "I am concerned about my workload affecting my balance.", action: "discuss_workload", intent: "DiscussWorkload", followUpQuestionIndex: null },
            { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to discuss any concerns about your workload?",
        possibleResponses: [
            { responseText: "I am concerned about my workload affecting my balance.", action: "discuss_workload", intent: "DiscussWorkload", followUpQuestionIndex: null },
            { responseText: "I have faced a few challenges with my workload.", action: "suggest_workload_review", intent: "ReportChallenge", followUpQuestionIndex: null },
            { responseText: "I need guidance on a specific task.", action: "schedule_meeting", intent: "RequestGuidance", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are you finding enough time for personal activities and rest?",
        possibleResponses: [
            { responseText: "I am managing my work-life balance well.", action: "acknowledge_response", intent: "DiscussWorkLifeBalance", followUpQuestionIndex: null },
            { responseText: "I am concerned about my workload affecting my balance.", action: "discuss_workload", intent: "DiscussWorkload", followUpQuestionIndex: null },
            { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to explore flexible work arrangements?",
        possibleResponses: [
            { responseText: "I would like to discuss flexible work arrangements.", action: "request_flexible_hours", intent: "RequestFlexibleHours", followUpQuestionIndex: null },
            { responseText: "I am concerned about my workload affecting my balance.", action: "discuss_workload", intent: "DiscussWorkload", followUpQuestionIndex: null },
            { responseText: "I need some time off to recharge.", action: "request_time_off", intent: "RequestTimeOff", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you feel the need for a break or time off?",
        possibleResponses: [
            { responseText: "I need some time off to recharge.", action: "request_time_off", intent: "RequestTimeOff", followUpQuestionIndex: null },
            { responseText: "I would like to discuss flexible work arrangements.", action: "request_flexible_hours", intent: "RequestFlexibleHours", followUpQuestionIndex: null },
            { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Is your work-life balance impacting your well-being?",
        possibleResponses: [
            { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I need some time off to recharge.", action: "request_time_off", intent: "RequestTimeOff", followUpQuestionIndex: null },
            { responseText: "I would like to discuss flexible work arrangements.", action: "request_flexible_hours", intent: "RequestFlexibleHours", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to discuss strategies for achieving a better work-life balance?",
        possibleResponses: [
            { responseText: "I would like to discuss flexible work arrangements.", action: "request_flexible_hours", intent: "RequestFlexibleHours", followUpQuestionIndex: null },
            { responseText: "I am concerned about my workload affecting my balance.", action: "discuss_workload", intent: "DiscussWorkload", followUpQuestionIndex: null },
            { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any personal commitments that are affecting your work?",
        possibleResponses: [
            { responseText: "I need some time off to recharge.", action: "request_time_off", intent: "RequestTimeOff", followUpQuestionIndex: null },
            { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I would like to discuss flexible work arrangements.", action: "request_flexible_hours", intent: "RequestFlexibleHours", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would it be helpful to adjust your work schedule?",
        possibleResponses: [
            { responseText: "I would like to discuss flexible work arrangements.", action: "request_flexible_hours", intent: "RequestFlexibleHours", followUpQuestionIndex: null },
            { responseText: "I need some time off to recharge.", action: "request_time_off", intent: "RequestTimeOff", followUpQuestionIndex: null },
            { responseText: "I am concerned about my workload affecting my balance.", action: "discuss_workload", intent: "DiscussWorkload", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you feel like you have enough time to recharge outside of work?",
        possibleResponses: [
            { responseText: "I need some time off to recharge.", action: "request_time_off", intent: "RequestTimeOff", followUpQuestionIndex: null },
            { responseText: "I am managing my work-life balance well.", action: "acknowledge_response", intent: "DiscussWorkLifeBalance", followUpQuestionIndex: null },
            { responseText: "I would like to discuss flexible work arrangements.", action: "request_flexible_hours", intent: "RequestFlexibleHours", followUpQuestionIndex: null }
        ]
    },

    // Well-Being and Health
    {
        questionText: "How is your overall well-being and health?",
        possibleResponses: [
            { responseText: "My overall well-being and health are good.", action: "acknowledge_response", intent: "WellBeingCheck", followUpQuestionIndex: null },
            { responseText: "I have some health-related concerns to discuss.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "There are work-related factors affecting my health.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to discuss any health-related concerns?",
        possibleResponses: [
            { responseText: "I have some health-related concerns to discuss.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "There are work-related factors affecting my health.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I need advice on maintaining a healthy work-life balance.", action: "provide_health_advice", intent: "DiscussHealth", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any work-related factors affecting your health?",
        possibleResponses: [
            { responseText: "There are work-related factors affecting my health.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I have some health-related concerns to discuss.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like some advice on maintaining a healthy work-life balance?",
        possibleResponses: [
            { responseText: "I need advice on maintaining a healthy work-life balance.", action: "provide_health_advice", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I would like to discuss flexible work arrangements.", action: "request_flexible_hours", intent: "RequestFlexibleHours", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Is there anything affecting your physical or mental health?",
        possibleResponses: [
            { responseText: "There are work-related factors affecting my health.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I have some health-related concerns to discuss.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you feel that your current work environment supports your well-being?",
        possibleResponses: [
            { responseText: "My overall well-being and health are good.", action: "acknowledge_response", intent: "WellBeingCheck", followUpQuestionIndex: null },
            { responseText: "There are work-related factors affecting my health.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I have some health-related concerns to discuss.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to talk about ways to improve your health at work?",
        possibleResponses: [
            { responseText: "I need advice on maintaining a healthy work-life balance.", action: "provide_health_advice", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "There are work-related factors affecting my health.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Are there any workplace changes that could benefit your health?",
        possibleResponses: [
            { responseText: "There are work-related factors affecting my health.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I need advice on maintaining a healthy work-life balance.", action: "provide_health_advice", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you feel like you have the resources to maintain your well-being?",
        possibleResponses: [
            { responseText: "My overall well-being and health are good.", action: "acknowledge_response", intent: "WellBeingCheck", followUpQuestionIndex: null },
            { responseText: "I don’t have all the resources I need.", action: "request_resources", intent: "RequestSupport", followUpQuestionIndex: null },
            { responseText: "There are work-related factors affecting my health.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to discuss any personal health goals?",
        possibleResponses: [
            { responseText: "I need advice on maintaining a healthy work-life balance.", action: "provide_health_advice", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I have some health-related concerns to discuss.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null },
            { responseText: "I feel my work-life balance is impacting my well-being.", action: "discuss_health", intent: "DiscussHealth", followUpQuestionIndex: null }
        ]
    },
    
    // Miscellaneous
    {
        questionText: "Is there anything else I can assist you with?",
        possibleResponses: [
            { responseText: "I have something else I'd like to discuss.", action: "schedule_meeting", intent: "SocialChat", followUpQuestionIndex: null },
            { responseText: "I would like to chat about something unrelated to work.", action: "social_chat", intent: "SocialChat", followUpQuestionIndex: null },
            { responseText: "I have a question that hasn't been addressed yet.", action: "seek_clarification", intent: "SeekClarification", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to discuss anything that hasn't been covered?",
        possibleResponses: [
            { responseText: "I have something else I'd like to discuss.", action: "schedule_meeting", intent: "SocialChat", followUpQuestionIndex: null },
            { responseText: "I would like to revisit a previous conversation.", action: "follow_up", intent: "FollowUp", followUpQuestionIndex: null },
            { responseText: "I have a question that hasn't been addressed yet.", action: "seek_clarification", intent: "SeekClarification", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Is there something on your mind that you'd like to talk about?",
        possibleResponses: [
            { responseText: "I have some personal concerns I'd like to talk about.", action: "discuss_personal_concerns", intent: "SocialChat", followUpQuestionIndex: null },
            { responseText: "I would like to chat about something unrelated to work.", action: "social_chat", intent: "SocialChat", followUpQuestionIndex: null },
            { responseText: "I have something else I'd like to discuss.", action: "schedule_meeting", intent: "SocialChat", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to chat about something unrelated to work?",
        possibleResponses: [
            { responseText: "I would like to chat about something unrelated to work.", action: "social_chat", intent: "SocialChat", followUpQuestionIndex: null },
            { responseText: "I have some personal concerns I'd like to talk about.", action: "discuss_personal_concerns", intent: "SocialChat", followUpQuestionIndex: null },
            { responseText: "I have something else I'd like to discuss.", action: "schedule_meeting", intent: "SocialChat", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you have any other concerns or topics you'd like to address?",
        possibleResponses: [
            { responseText: "I have something else I'd like to discuss.", action: "schedule_meeting", intent: "SocialChat", followUpQuestionIndex: null },
            { responseText: "I would like to revisit a previous conversation.", action: "follow_up", intent: "FollowUp", followUpQuestionIndex: null },
            { responseText: "I have some personal concerns I'd like to talk about.", action: "discuss_personal_concerns", intent: "SocialChat", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to share anything about your personal life?",
        possibleResponses: [
            { responseText: "I have some personal concerns I'd like to talk about.", action: "discuss_personal_concerns", intent: "SocialChat", followUpQuestionIndex: null },
            { responseText: "I would like to chat about something unrelated to work.", action: "social_chat", intent: "SocialChat", followUpQuestionIndex: null },
            { responseText: "I have something else I'd like to discuss.", action: "schedule_meeting", intent: "SocialChat", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Is there anything specific you'd like to focus on today?",
        possibleResponses: [
            { responseText: "I have something else I'd like to discuss.", action: "schedule_meeting", intent: "SocialChat", followUpQuestionIndex: null },
            { responseText: "I would like to revisit a previous conversation.", action: "follow_up", intent: "FollowUp", followUpQuestionIndex: null },
            { responseText: "I would like to chat about something unrelated to work.", action: "social_chat", intent: "SocialChat", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Would you like to discuss any hobbies or interests outside of work?",
        possibleResponses: [
            { responseText: "I would like to chat about something unrelated to work.", action: "social_chat", intent: "SocialChat", followUpQuestionIndex: null },
            { responseText: "I have something else I'd like to discuss.", action: "schedule_meeting", intent: "SocialChat", followUpQuestionIndex: null },
            { responseText: "I have some personal concerns I'd like to talk about.", action: "discuss_personal_concerns", intent: "SocialChat", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Do you have any questions or concerns that haven't been mentioned?",
        possibleResponses: [
            { responseText: "I have a question that hasn't been addressed yet.", action: "seek_clarification", intent: "SeekClarification", followUpQuestionIndex: null },
            { responseText: "I would like to revisit a previous conversation.", action: "follow_up", intent: "FollowUp", followUpQuestionIndex: null },
            { responseText: "I have something else I'd like to discuss.", action: "schedule_meeting", intent: "SocialChat", followUpQuestionIndex: null }
        ]
    },
    {
        questionText: "Is there anything you'd like to revisit from a previous conversation?",
        possibleResponses: [
            { responseText: "I would like to revisit a previous conversation.", action: "follow_up", intent: "FollowUp", followUpQuestionIndex: null },
            { responseText: "I have a question that hasn't been addressed yet.", action: "seek_clarification", intent: "SeekClarification", followUpQuestionIndex: null },
            { responseText: "I have something else I'd like to discuss.", action: "schedule_meeting", intent: "SocialChat", followUpQuestionIndex: null }
        ]
    }
    ];
    
module.exports = botQuestions;
