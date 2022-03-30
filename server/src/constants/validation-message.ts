export const ValidationMessage = {

    // E-mail ID
    EMAIL_INVALID_MESSAGE: "Please provide a valid E-mail ID",

    // Display Name
    DISPLAY_NAME_LENGTH_MESSAGE: "Display name must be 5 to 50 characters long",

    // Password
    PASSWORD_MIN_LENGTH_MESSAGE: "Password must be atleast 10 characters long",
    PASSWORD_EMPTY_MESSAGE: "Password must not be empty",

    // Task
    TASK_DESCRIPTION_MESSAGE: "description must not be empty and atmost 2000 characters long",
    IS_RECURRING_MESSAGE: "isRecurring must be a boolean",
    ON_DATE_MESSAGE: "onDate must be a valid date",
    ON_DATE_REQUIRED_MESSAGE: "onDate should be set for a non-recurring task",
    FROM_DATE_MESSAGE: "fromDate must be a valid date",
    FROM_DATE_REQUIRED_MESSAGE: "fromDate should be set for a recurring task",
    TO_DATE_MESSAGE: "toDate must be a valid date",
    RECURRING_TYPE_MESSAGE: "recurringType should be either 'FIXED', 'WEEKLY' or 'MONTHLY'",
    RECURRING_TYPE_REQIRED_MESSAGE: "recurringType should be set for a recurring task",
    PERIOD_MESSAGE: "period must be a non-zero positive integer",
    PERIOD_REQUIRED_MESSAGE: "period must be set for fixed recurring type",
    DAYS_OF_THE_WEEK_MESSAGE: "daysOfTheWeek must be an array of non-zero positive integers",
    DAYS_OF_THE_WEEK_REQUIRED_MESSAGE: "daysOfTheWeek must be set for weekly recurring type",
    DAYS_OF_THE_MONTH_MESSAGE: "daysOfTheMonth must be an array of non-zero positive integers",
    DAYS_OF_THE_MONTH_REQUIRED_MESSAGE: "daysOfTheMonth must be set for monthly recurring type and should not be set otherwise",

} as const;