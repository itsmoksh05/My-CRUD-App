package com.myapp.crud_app.controller;

import com.myapp.crud_app.model.Item;
import com.myapp.crud_app.service.ItemService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    // CREATE
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createItem(@RequestBody Item item, @RequestParam String username) {
        try {
            Item createdItem = itemService.createItem(item, username);  // Create item and associate with the user
            return ResponseEntity.ok(createdItem);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());  // Handle item creation limitation
        }
    }

    // READ
    @GetMapping("/item-id/{id}")
    public ResponseEntity<?> getItemById(@PathVariable String id, @RequestParam String username) {
        try {
            Item item = itemService.getItemById(id, username);  // Fetch item by ID and ensure ownership
            return ResponseEntity.ok(item);
        } catch (IllegalStateException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());  // Handle unauthorized access or not found
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<Item>> getItemsByUser(@PathVariable String username) {
        List<Item> items = itemService.getItemsByUsername(username);  // Fetch all items by username
        return ResponseEntity.ok(items);
    }

    @GetMapping("/name/{itemName}")
    public ResponseEntity<List<Item>> getItemByName(@PathVariable String itemName, @RequestParam String username) {
        List<Item> items = itemService.getItemByItemName(itemName, username);  // Fetch items by name and username
        return ResponseEntity.ok(items);
    }

    @GetMapping("/price/{itemPrice}")
    public ResponseEntity<List<Item>> getItemByPrice(@PathVariable double itemPrice, @RequestParam String username) {
        List<Item> items = itemService.getItemByItemPrice(itemPrice, username);  // Fetch items by price and username
        return ResponseEntity.ok(items);
    }

    @GetMapping("/quantity/{itemQuantity}")
    public ResponseEntity<List<Item>> getItemByQuantity(@PathVariable int itemQuantity, @RequestParam String username) {
        List<Item> items = itemService.getItemByItemQuantity(itemQuantity, username);  // Fetch items by quantity and username
        return ResponseEntity.ok(items);
    }

    @GetMapping("/created-after")
    public ResponseEntity<List<Item>> getItemByCreatedAtAfter(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date, @RequestParam String username) {
        List<Item> items = itemService.getItemByCreatedAtAfter(date, username);  // Fetch items created after a date by username
        return ResponseEntity.ok(items);
    }

    @GetMapping("/updated-before")
    public ResponseEntity<List<Item>> getItemByUpdatedAtBefore(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date, @RequestParam String username) {
        List<Item> items = itemService.getItemByUpdatedAtBefore(date, username);  // Fetch items updated before a date by username
        return ResponseEntity.ok(items);
    }

    @GetMapping("/created-between")
    public ResponseEntity<List<Item>> getItemByCreatedAtBetween(@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
                                                                @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
                                                                @RequestParam String username) {
        List<Item> items = itemService.getItemByCreatedAtBetween(startDate, endDate, username);  // Fetch items created between two dates by username
        return ResponseEntity.ok(items);
    }

    @GetMapping("/updated-between")
    public ResponseEntity<List<Item>> getItemByUpdatedAtBetween(@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
                                                                @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
                                                                @RequestParam String username) {
        List<Item> items = itemService.getItemByUpdatedAtBetween(startDate, endDate, username);  // Fetch items updated between two dates by username
        return ResponseEntity.ok(items);
    }

    // UPDATE
    @PutMapping
    public ResponseEntity<?> updateItem(@RequestBody Item item, @RequestParam String username) {
        try {
            Item updatedItem = itemService.updateItem(item, username);  // Update item and ensure ownership
            return ResponseEntity.ok(updatedItem);
        } catch (IllegalStateException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());  // Handle unauthorized access or not found
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable String id, @RequestParam String username) {
        try {
            String message = itemService.deleteItem(id, username);  // Delete item and ensure ownership
            return ResponseEntity.ok(message);
        } catch (IllegalStateException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());  // Handle unauthorized access or not found
        }
    }
}
