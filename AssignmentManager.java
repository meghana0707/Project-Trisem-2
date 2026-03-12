import java.util.*;

// Assignment Class
class Assignment {
    String title;
    String subject;
    int priority;

    Assignment(String title, String subject, int priority) {
        this.title = title;
        this.subject = subject;
        this.priority = priority;
    }

    public String toString() {
        return "Title: " + title + " | Subject: " + subject + " | Priority: " + priority;
    }
}

public class AssignmentManager {

    static ArrayList<Assignment> assignments = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);

    // Add Assignment
    static void addAssignment() {
        System.out.print("Enter Assignment Title: ");
        String title = sc.nextLine();

        System.out.print("Enter Subject: ");
        String subject = sc.nextLine();

        System.out.print("Enter Priority (1-5): ");
        int priority = sc.nextInt();
        sc.nextLine();

        assignments.add(new Assignment(title, subject, priority));

        System.out.println("✅ Assignment Added Successfully!\n");
    }

    // Display Assignments
    static void displayAssignments() {
        if(assignments.isEmpty()) {
            System.out.println("⚠ No assignments available.\n");
            return;
        }

        System.out.println("\n📚 Assignment List:");
        for(Assignment a : assignments) {
            System.out.println(a);
        }
        System.out.println();
    }

    // Search Assignment (Linear Search)
    static void searchAssignment() {
        System.out.print("Enter assignment title to search: ");
        String search = sc.nextLine();

        boolean found = false;

        for(Assignment a : assignments) {
            if(a.title.equalsIgnoreCase(search)) {
                System.out.println("✅ Assignment Found:");
                System.out.println(a);
                found = true;
                break;
            }
        }

        if(!found) {
            System.out.println("❌ Assignment not found.\n");
        }
    }

    public static void main(String[] args) {

        while(true) {
            System.out.println("====== Assignment Manager ======");
            System.out.println("1. Add Assignment");
            System.out.println("2. Display Assignments");
            System.out.println("3. Search Assignment");
            System.out.println("4. Exit");

            System.out.print("Choose option: ");
            int choice = sc.nextInt();
            sc.nextLine();

            switch(choice) {

                case 1:
                    addAssignment();
                    break;

                case 2:
                    displayAssignments();
                    break;

                case 3:
                    searchAssignment();
                    break;

                case 4:
                    System.out.println("Program Exited.");
                    return;

                default:
                    System.out.println("Invalid Choice\n");
            }
        }
    }
}