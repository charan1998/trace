export const Descriptions = {

    // Inputs
    GET_TASK_TASK_ID_DESCRIPTION: "ID of the task to be fetched",
    GET_DAILY_TASKS_DATE_DESCRIPTION: "Date for which daily tasks has to be fetched",

    // Login Input
    LOGIN_INPUT_DESCRIPTION: "Login details for the user's account",
    LOGIN_INPUT_EMAIL_DESCRIPTION: "Registered E-mail ID of the user",
    LOGIN_INPUT_PASSWORD_DESCRIPTION: "Password for the user's account",

    // Register Input
    REGISTER_INPUT_DESCRIPTION: "Account details for the new account being created",
    REGISTER_INPUT_EMAIL_DESCRIPTION: "E-mail ID for the account",
    REGISTER_INPUT_DISPLAY_NAME_DESCRIPTION: "Display name for the account",
    REGISTER_INPUT_PASSWORD_DESCRIPTION: "Password for the account",

    // Task Input
    TASK_INPUT_DESCRIPTION: "Details of the task to be added",
    TASK_INPUT_DESCRIPTION_DESCRIPTION: "A string describing the task",
    TASK_INPUT_IS_RECURRING_DESCRIPTION: "Specifies weather the task is a one-time task or recurring task",
    TASK_INPUT_ON_DATE_DESCRIPTION: "Specifies the date on which the task has to be done. This is required for one-time tasks",
    TASK_INPUT_FROM_DATE_DESCRIPTION: "Specifies the date from which the recurring task would start. This is required for recurring tasks",
    TASK_INPUT_TO_DATE_DESCRIPTION: "Specifies the date till which the recurring task would go on",
    TASK_INPUT_RECURRING_TYPE_DESCRIPTION: "Specifies the type of the recurring task. 'FIXED' specifies that the task would repeat itself after fixed number of days. " +
                                    "'WEEKLY' specifies that the task would repeat itself for particular days of the week. " +
                                    "'MONTHLY' specifies that the task would repeat itself for particular days of the month",
    TASK_INPUT_PERIOD_TYPE_DESCRIPTION: "Specifies the number of days after which the task would repeat itself. This is required for fixed recurring tasks",
    TASK_INPUT_DAYS_OF_THE_WEEK_DESCRIPTION: "Specifies the days of the week for which the task would repeat itself. This is required for weekly recurring tasks",
    TASK_INPUT_DAYS_OF_THE_MONTH_DESCRIPTION: "Specifies the days of the month for which the task would repeat itself. This is required for monthly recurring tasks",

    // Queries
    ME_QUERY_DESCRIPTION: "Fetches the details of the logged in user",
    GET_TASK_QUERY_DESCRIPTION: "Fetches the details of the task",
    GET_DAILY_TASKS_QUERY_DESCRIPTION: "Fetches the tasks for the given day",

    // Mutations
    REGISTER_MUTATION_DESCRIPTION: "Validates user details and adds the user to the database",
    LOGIN_MUTATION_DESCRIPTION: "Validates login details and creates a session for the user",
    ADD_TASK_MUTATION_DESCRIPTION: "Validates task details and adds the task to the database",

    // User
    USER_DESCRIPTION: "Details of a user",
    USER_EMAIL_DESCRIPTION: "Registered Email-ID of the user",
    USER_DISPLAY_NAME_DESCRIPTION: "Display name of the user",

    // Task
    TASK_DESCRIPTION: "Details of a task",
    TASK_USER_DESCRIPTION: "Specifies the user who created this task",
    TASK_DESCRIPTION_DESCRIPTION: "A string describing the task",
    TASK_IS_RECURRING_DESCRIPTION: "Specifies weather the task is a one-time task or recurring task",
    TASK_ON_DATE_DESCRIPTION: "Specifies the date on which the task has to be done.",
    TASK_FROM_DATE_DESCRIPTION: "Specifies the date from which the recurring task would start.",
    TASK_TO_DATE_DESCRIPTION: "Specifies the date till which the recurring task would go on",
    TASK_RECURRING_TYPE_DESCRIPTION: "Specifies the type of the recurring task. 'FIXED' specifies that the task would repeat itself after fixed number of days. " +
                                    "'WEEKLY' specifies that the task would repeat itself for particular days of the week. " +
                                    "'MONTHLY' specifies that the task would repeat itself for particular days of the month",
    TASK_PERIOD_TYPE_DESCRIPTION: "Specifies the number of days after which the task would repeat itself.",
    TASK_DAYS_OF_THE_WEEK_DESCRIPTION: "Specifies the days of the week for which the task would repeat itself.",
    TASK_DAYS_OF_THE_MONTH_DESCRIPTION: "Specifies the days of the month for which the task would repeat itself.",
    TASK_DONE_ON_DESCRIPTION: "Specifies the days on which the task was done",

    // Daily Task
    DAILY_TASK_DESCRIPTION: "Details of a task for the day",
    DAILY_TASK_TASK_ID_DESCRIPTION: "ID of the task",
    DAILY_TASK_DESCRIPTION_DESCRIPTION: "Description of the task",
    DAILY_TASK_DATE_DESCRIPTION: "Date for the task",
    DAILY_TASK_IS_DONE_DESCRIPTION: "Specifies if the task was done on that day",

} as const;