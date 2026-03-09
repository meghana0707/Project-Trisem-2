/**
 * Smart Academic Scheduler - Notification System
 * DSA Concepts Implementation: Linked List & Stack
 */

// ================== LINKED LIST IMPLEMENTATION ==================
// Linked List for O(1) insertion/deletion at beginning - Queue management

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    // Add at beginning - O(1)
    addFirst(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
        return newNode;
    }

    // Add at end - O(n)
    addLast(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.length++;
            return newNode;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
        this.length++;
        return newNode;
    }

    // Remove from beginning - O(1)
    removeFirst() {
        if (!this.head) return null;
        const removed = this.head;
        this.head = this.head.next;
        this.length--;
        return removed;
    }

    // Remove by data - O(n)
    remove(data) {
        if (!this.head) return null;
        
        if (this.head.data.id === data.id) {
            this.head = this.head.next;
            this.length--;
            return true;
        }
        
        let current = this.head;
        while (current.next) {
            if (current.next.data.id === data.id) {
                current.next = current.next.next;
                this.length--;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    // Search - O(n)
    search(id) {
        let current = this.head;
        while (current) {
            if (current.data.id === id) {
                return current.data;
            }
            current = current.next;
        }
        return null;
    }

    // Get all as array - O(n)
    toArray() {
        const arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.data);
            current = current.next;
        }
        return arr;
    }

    // Reverse the linked list - O(n)
    reverse() {
        let prev = null;
        let current = this.head;
        let next = null;
        
        while (current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        this.head = prev;
    }
}

// ================== STACK IMPLEMENTATION ==================
// Stack for LIFO operations - Undo/History feature

class Stack {
    constructor() {
        this.items = [];
        this.maxSize = 100; // Limit stack size
    }

    // Push - O(1)
    push(item) {
        if (this.items.length >= this.maxSize) {
            this.items.pop(); // Remove oldest if full
        }
        this.items.push(item);
    }

    // Pop - O(1)
    pop() {
        return this.items.pop();
    }

    // Peek - O(1)
    peek() {
        return this.items[this.items.length - 1];
    }

    // Check if empty - O(1)
    isEmpty() {
        return this.items.length === 0;
    }

    // Get size - O(1)
    size() {
        return this.items.length;
    }

    // Get all - O(n)
    getAll() {
        return [...this.items].reverse();
    }

    // Clear - O(n)
    clear() {
        this.items = [];
    }
}

// ================== NOTIFICATION SYSTEM ==================

// Initialize DSA Data Structures
const notificationQueue = new LinkedList();  // Linked List for notifications
const notificationHistory = new Stack();    // Stack for undo feature

// Sample notifications stored in Linked List
notificationQueue.addLast({
    id: "notif_1",
    title: "New Assignment Added",
    message: "Math assignment due: 25 April",
    read: false,
    timestamp: Date.now() - 120000
});

notificationQueue.addLast({
    id: "notif_2",
    title: "Quiz Available",
    message: "Physics Quiz 1 is now available",
    read: false,
    timestamp: Date.now() - 3600000
});

notificationQueue.addLast({
    id: "notif_3",
    title: "Timetable Updated",
    message: "Weekly timetable updated",
    read: true,
    timestamp: Date.now() - 86400000
});

// ================== UI FUNCTIONS ==================

// Display notifications from Linked List
function displayNotifications() {
    const notifications = notificationQueue.toArray();
    const container = document.getElementById("notificationList");
    
    if (notifications.length === 0) {
        container.innerHTML = "<p>No notifications yet!</p>";
        return;
    }

    container.innerHTML = notifications.map(notif => `
        <div class="card ${notif.read ? '' : 'unread'}">
            <h4>📘 ${notif.title}</h4>
            <p>${notif.message}</p>
            <div class="small">${getTimeAgo(notif.timestamp)}</div>
            ${!notif.read ? `<button onclick="markRead('${notif.id}')">Mark as Read</button>` : ''}
            <button onclick="deleteNotification('${notif.id}')" class="delete-btn">Delete</button>
        </div>
    `).join('');
}

// Get time ago string
function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return Math.floor(seconds / 60) + " minutes ago";
    if (seconds < 86400) return Math.floor(seconds / 3600) + " hours ago";
    return Math.floor(seconds / 86400) + " days ago";
}

// Mark notification as read
function markRead(id) {
    const notif = notificationQueue.search(id);
    if (notif) {
        notif.read = true;
        // Push to history for undo
        notificationHistory.push({
            action: "markRead",
            data: notif
        });
        displayNotifications();
        showResult("✅ Notification marked as read!");
    }
}

// Delete notification using Linked List - O(n)
function deleteNotification(id) {
    const notif = notificationQueue.search(id);
    if (notif) {
        // Push to history for undo
        notificationHistory.push({
            action: "delete",
            data: notif
        });
        
        notificationQueue.remove({ id: id });
        displayNotifications();
        showResult("✅ Notification deleted! (Use Undo to restore)");
    }
}

// Add new notification using Linked List - O(1) at end
function addNotification() {
    const title = document.getElementById("notifTitle").value;
    const message = document.getElementById("notifMessage").value;

    if (!title || !message) {
        alert("Please enter title and message!");
        return;
    }

    const newNotif = {
        id: "notif_" + Date.now(),
        title: title,
        message: message,
        read: false,
        timestamp: Date.now()
    };

    // Add to Linked List - O(1) at end
    notificationQueue.addLast(newNotif);
    
    // Push to history for undo
    notificationHistory.push({
        action: "add",
        data: newNotif
    });

    displayNotifications();
    
    showResult("✅ Notification added using LINKED LIST!\nOperation: O(n) - Added at end");
    
    // Clear inputs
    document.getElementById("notifTitle").value = "";
    document.getElementById("notifMessage").value = "";
}

// Search notifications using Linked List - O(n)
function searchNotifications() {
    const searchTerm = document.getElementById("searchInput").value;
    const resultDiv = document.getElementById("searchResult");

    if (!searchTerm) {
        alert("Please enter a search term!");
        return;
    }

    const allNotifs = notificationQueue.toArray();
    const results = allNotifs.filter(n => 
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (results.length > 0) {
        resultDiv.innerHTML = `<strong>✅ Found ${results.length} result(s)!</strong><br>` +
            results.map(r => `Title: ${r.title}<br>Message: ${r.message}`).join("<br><br>");
    } else {
        resultDiv.innerHTML = "<strong>❌ Not found!</strong>";
    }
}

// Undo last action using Stack - O(1)
function undoAction() {
    if (notificationHistory.isEmpty()) {
        showResult("❌ No actions to undo!");
        return;
    }

    const lastAction = notificationHistory.pop();
    
    switch (lastAction.action) {
        case "add":
            // Remove the added notification
            notificationQueue.remove(lastAction.data);
            showResult("↩️ Undo: Notification removed!");
            break;
        case "delete":
            // Re-add the deleted notification
            notificationQueue.addLast(lastAction.data);
            showResult("↩️ Undo: Notification restored!");
            break;
        case "markRead":
            // Mark as unread
            const notif = notificationQueue.search(lastAction.data.id);
            if (notif) notif.read = false;
            showResult("↩️ Undo: Notification marked as unread!");
            break;
    }
    
    displayNotifications();
}

// Show result message
function showResult(message) {
    document.getElementById("result").innerHTML = message;
}

// ================== DSA TEST FUNCTIONS ==================

// Test Linked List - Shows O(1) insertion and O(n) search
function testLinkedList() {
    const start = performance.now();
    
    // Add 1000 notifications at beginning - O(1) each
    for (let i = 1; i <= 1000; i++) {
        notificationQueue.addFirst({
            id: "test_" + i,
            title: "Test " + i,
            message: "Test message " + i
        });
    }
    
    const addTime = performance.now() - start;
    
    // Search for last item - O(n)
    const searchStart = performance.now();
    notificationQueue.search("test_500");
    const searchTime = performance.now() - searchStart;
    
    document.getElementById("result").innerHTML = 
        `🔗 <strong>LINKED LIST TEST RESULTS</strong>\n\n` +
        `✅ Added 1000 items at beginning: ${addTime.toFixed(2)}ms\n` +
        `   Operation: O(1) per insertion\n\n` +
        `🔍 Searched for item 500: ${searchTime.toFixed(2)}ms\n` +
        `   Operation: O(n) - must traverse\n\n` +
        `📊 Total items in list: ${notificationQueue.length}`;
}

// Test Stack - Shows LIFO behavior for undo
function testStack() {
    // Push 10 items
    for (let i = 1; i <= 10; i++) {
        notificationHistory.push({
            action: "action_" + i,
            data: { id: i, title: "Action " + i }
        });
    }
    
    const items = notificationHistory.getAll();
    
    // Pop 3 items
    const popped1 = notificationHistory.pop();
    const popped2 = notificationHistory.pop();
    const popped2Again = notificationHistory.pop();
    
    document.getElementById("result").innerHTML = 
        `📚 <strong>STACK TEST RESULTS</strong>\n\n` +
        `✅ Pushed 10 items to stack\n` +
        `   Stack size: ${notificationHistory.size()}\n\n` +
        `📤 Popped 3 items (LIFO - Last In First Out):\n` +
        `   1. ${popped2Again.data.title}\n` +
        `   2. ${popped2.data.title}\n` +
        `   3. ${popped1.data.title}\n\n` +
        `🔑 Stack is perfect for UNDO operations!`;
}

// Test Add/Delete with Linked List
function testAddDelete() {
    const testId = "demo_" + Date.now();
    
    // Add - O(1) at end
    const startAdd = performance.now();
    notificationQueue.addLast({
        id: testId,
        title: "Demo Notification",
        message: "Testing Linked List"
    });
    const addTime = performance.now() - startAdd;
    
    // Delete - O(n)
    const startDel = performance.now();
    notificationQueue.remove({ id: testId });
    const delTime = performance.now() - startDel;
    
    document.getElementById("result").innerHTML = 
        `⚡ <strong>ADD/DELETE TEST RESULTS</strong>\n\n` +
        `➕ Add operation: ${addTime.toFixed(4)}ms (O(1) at end)\n` +
        `🗑️ Delete operation: ${delTime.toFixed(4)}ms (O(n) search + delete)\n\n` +
        `✅ Linked List is efficient for queue management!`;
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    displayNotifications();
    console.log("🚀 Smart Academic Scheduler - DSA Concepts Active!");
    console.log("🔗 Linked List: O(1) insert, O(n) search");
    console.log("📚 Stack: O(1) push/pop for undo operations");
});
