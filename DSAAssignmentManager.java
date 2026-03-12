import java.util.*;

// Node for Linked List
class Node {
    Assignment data;
    Node next;

    Node(Assignment data) {
        this.data = data;
        this.next = null;
    }
}

// Assignment class
class Assignment {
    String title;
    String subject;
    int priority;

    Assignment(String t, String s, int p) {
        title = t;
        subject = s;
        priority = p;
    }

    public String toString() {
        return "Title: " + title + " | Subject: " + subject + " | Priority: " + priority;
    }
}

// Linked List ADT
class AssignmentList {

    Node head;

    // Insert
    void insert(Assignment a) {
        Node newNode = new Node(a);

        if (head == null) {
            head = newNode;
            return;
        }

        Node temp = head;
        while (temp.next != null)
            temp = temp.next;

        temp.next = newNode;
    }

    // Delete
    void delete(String title) {

        Node temp = head, prev = null;

        while (temp != null && !temp.data.title.equalsIgnoreCase(title)) {
            prev = temp;
            temp = temp.next;
        }

        if (temp == null) {
            System.out.println("Assignment not found.");
            return;
        }

        if (prev == null)
            head = temp.next;
        else
            prev.next = temp.next;

        System.out.println("Assignment deleted.");
    }

    // Traverse
    void display() {
        if (head == null) {
            System.out.println("No assignments.");
            return;
        }

        Node temp = head;
        while (temp != null) {
            System.out.println(temp.data);
            temp = temp.next;
        }
    }

    // Linear Search
    Assignment linearSearch(String title) {

        Node temp = head;

        while (temp != null) {
            if (temp.data.title.equalsIgnoreCase(title))
                return temp.data;
            temp = temp.next;
        }

        return null;
    }

    // Convert to Array
    ArrayList<Assignment> toArray() {
        ArrayList<Assignment> arr = new ArrayList<>();

        Node temp = head;
        while (temp != null) {
            arr.add(temp.data);
            temp = temp.next;
        }

        return arr;
    }
}

public class DSAAssignmentManager {

    static Scanner sc = new Scanner(System.in);

    static AssignmentList list = new AssignmentList();

    // Stack for undo
    static Stack<Assignment> undoStack = new Stack<>();

    // Queue for processing assignments
    static Queue<Assignment> queue = new LinkedList<>();

    // HashMap for fast search
    static HashMap<String, Assignment> map = new HashMap<>();

    // Add assignment
    static void addAssignment() {

        System.out.print("Enter title: ");
        String title = sc.nextLine();

        System.out.print("Enter subject: ");
        String subject = sc.nextLine();

        System.out.print("Enter priority: ");
        int priority = sc.nextInt();
        sc.nextLine();

        Assignment a = new Assignment(title, subject, priority);

        list.insert(a);
        undoStack.push(a);
        queue.add(a);
        map.put(title.toLowerCase(), a);

        System.out.println("Assignment added.\n");
    }

    // Search assignment
    static void searchAssignment() {

        System.out.print("Enter title to search: ");
        String title = sc.nextLine();

        Assignment a = map.get(title.toLowerCase());

        if (a != null)
            System.out.println("Found: " + a);
        else
            System.out.println("Assignment not found.");
    }

    // Sort using Insertion Sort
    static void sortAssignments() {

        ArrayList<Assignment> arr = list.toArray();

        for (int i = 1; i < arr.size(); i++) {

            Assignment key = arr.get(i);
            int j = i - 1;

            while (j >= 0 && arr.get(j).priority > key.priority) {
                arr.set(j + 1, arr.get(j));
                j--;
            }

            arr.set(j + 1, key);
        }

        System.out.println("Sorted Assignments (by priority):");

        for (Assignment a : arr)
            System.out.println(a);
    }

    // Undo using Stack
    static void undoLastAdd() {

        if (undoStack.isEmpty()) {
            System.out.println("Nothing to undo.");
            return;
        }

        Assignment a = undoStack.pop();
        list.delete(a.title);
        map.remove(a.title.toLowerCase());

        System.out.println("Undo successful.");
    }

    // Process using Queue
    static void processAssignment() {

        if (queue.isEmpty()) {
            System.out.println("No assignments in queue.");
            return;
        }

        Assignment a = queue.poll();

        System.out.println("Processing: " + a);
    }

    public static void main(String[] args) {

        while (true) {

            System.out.println("\n====== DSA Assignment Manager ======");
            System.out.println("1. Add Assignment");
            System.out.println("2. Display Assignments");
            System.out.println("3. Search Assignment");
            System.out.println("4. Delete Assignment");
            System.out.println("5. Sort by Priority");
            System.out.println("6. Undo Last Add");
            System.out.println("7. Process Assignment (Queue)");
            System.out.println("8. Exit");

            System.out.print("Choose option: ");
            int ch = sc.nextInt();
            sc.nextLine();

            switch (ch) {

                case 1:
                    addAssignment();
                    break;

                case 2:
                    list.display();
                    break;

                case 3:
                    searchAssignment();
                    break;

                case 4:
                    System.out.print("Enter title to delete: ");
                    String t = sc.nextLine();
                    list.delete(t);
                    map.remove(t.toLowerCase());
                    break;

                case 5:
                    sortAssignments();
                    break;

                case 6:
                    undoLastAdd();
                    break;

                case 7:
                    processAssignment();
                    break;

                case 8:
                    System.exit(0);

                default:
                    System.out.println("Invalid choice");
            }
        }
    }
}