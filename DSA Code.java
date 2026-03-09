import java.util.*;

// Task class
class Task {
    String subject;
    String description;
    int priority;
    String date;

    Task(String subject, String description, int priority, String date) {
        this.subject = subject;
        this.description = description;
        this.priority = priority;
        this.date = date;
    }

    public String toString() {
        return subject + " | " + description + " | Priority: " + priority + " | Date: " + date;
    }
}

public class SmartScheduler {

    // Linked List to store tasks (CO2)
    static LinkedList<Task> taskList = new LinkedList<>();

    // Queue for notifications (CO3)
    static Queue<Task> notificationQueue = new LinkedList<>();

    // Priority Queue (Heap) for urgent tasks (CO3)
    static PriorityQueue<Task> priorityTasks = new PriorityQueue<>(
            (a, b) -> b.priority - a.priority);

    // HashMap for fast lookup (CO4)
    static HashMap<String, Task> taskMap = new HashMap<>();

    static Scanner sc = new Scanner(System.in);

    // Add Task
    static void addTask() {
        System.out.print("Enter Subject: ");
        String subject = sc.next();

        System.out.print("Enter Description: ");
        String desc = sc.next();

        System.out.print("Enter Priority (1-5): ");
        int priority = sc.nextInt();

        System.out.print("Enter Date: ");
        String date = sc.next();

        Task t = new Task(subject, desc, priority, date);

        taskList.add(t);
        notificationQueue.add(t);
        priorityTasks.add(t);
        taskMap.put(subject, t);

        System.out.println("Task Added Successfully!");
    }

    // Display Tasks
    static void displayTasks() {
        if(taskList.isEmpty()) {
            System.out.println("No Tasks Available");
            return;
        }

        for(Task t : taskList) {
            System.out.println(t);
        }
    }

    // Search Task (Linear Search – CO1)
    static void searchTask() {
        System.out.print("Enter subject to search: ");
        String key = sc.next();

        if(taskMap.containsKey(key)) {
            System.out.println("Task Found: " + taskMap.get(key));
        } else {
            System.out.println("Task Not Found");
        }
    }

    // Process Notification (Queue – CO3)
    static void processNotification() {
        if(notificationQueue.isEmpty()) {
            System.out.println("No notifications");
            return;
        }

        Task t = notificationQueue.poll();
        System.out.println("Notification: Upcoming Task -> " + t);
    }

    // Show Highest Priority Task (Heap – CO3)
    static void showPriorityTask() {
        if(priorityTasks.isEmpty()) {
            System.out.println("No priority tasks");
            return;
        }

        System.out.println("Most Urgent Task: " + priorityTasks.peek());
    }

    // Sort Tasks (CO1 – Sorting)
    static void sortTasks() {
        taskList.sort((a,b) -> a.date.compareTo(b.date));

        System.out.println("Tasks Sorted by Date:");
        displayTasks();
    }

    public static void main(String[] args) {

        while(true) {

            System.out.println("\nSMART ACADEMIC SCHEDULER");
            System.out.println("1 Add Task");
            System.out.println("2 Display Tasks");
            System.out.println("3 Search Task");
            System.out.println("4 Process Notification");
            System.out.println("5 Show Urgent Task");
            System.out.println("6 Sort Tasks by Date");
            System.out.println("7 Exit");

            System.out.print("Enter choice: ");
            int ch = sc.nextInt();

            switch(ch) {

                case 1:
                    addTask();
                    break;

                case 2:
                    displayTasks();
                    break;

                case 3:
                    searchTask();
                    break;

                case 4:
                    processNotification();
                    break;

                case 5:
                    showPriorityTask();
                    break;

                case 6:
                    sortTasks();
                    break;

                case 7:
                    System.exit(0);

                default:
                    System.out.println("Invalid choice");
            }
        }
    }
}