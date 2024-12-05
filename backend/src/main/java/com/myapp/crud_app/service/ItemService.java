package com.myapp.crud_app.service;

import com.myapp.crud_app.model.Item;
import com.myapp.crud_app.repository.ItemRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ApplicationContext applicationContext;

    // CREATE
    public Item createItem(Item item, String username) {
        // Ensure user can't create more than 3 items

//        String token = request.getHeader("Authorization").replace("Bearer ", "");
//
//        UserDetails userDetails = applicationContext.getBean(MyUserDetailsService.class).loadUserByUsername(username);

//        if(jwtService.validateToken(token, userDetails)) {

            List<Item> userItems = itemRepository.findByUsername(username);
            if (userItems.size() >= 3) {
                throw new IllegalStateException("You cannot create more than 3 items.");
            }

            item.setUsername(username);  // Set the item owner
            return itemRepository.save(item);  // Save the new item
//        } else {
//            throw new RuntimeException("Token is Not Valid !!!");
//        }
    }



    public Item getItemById(String id, String username) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Item not found!"));
        if (!item.getUsername().equals(username)) {
            throw new IllegalStateException("User not authorized to access this item.");
        }
        return item;
    }

    public List<Item> getItemsByUsername(String username) {

//        String token = request.getHeader("Authorization").replace("Bearer ", "");
//        UserDetails userDetails = applicationContext.getBean(MyUserDetailsService.class).loadUserByUsername(username);
//
//        if(jwtService.validateToken(token, userDetails)){

            return itemRepository.findByUsername(username);  // Fetch all items for a specific user
//        } else {
//            System.out.println("This Worked !!!");
//            throw new RuntimeException("Token is Not Valid !!");
//        }
    }

    public List<Item> getItemByItemName(String itemName, String username) {
        return itemRepository.findByItemNameAndUsername(itemName, username);  // Fetch items by name and username
    }

    public List<Item> getItemByItemPrice(double itemPrice, String username) {
        return itemRepository.findByItemPriceAndUsername(itemPrice, username);  // Fetch items by price and username
    }

    public List<Item> getItemByItemQuantity(int itemQuantity, String username) {
        return itemRepository.findByItemQuantityAndUsername(itemQuantity, username);  // Fetch items by quantity and username
    }

    public List<Item> getItemByCreatedAtAfter(LocalDateTime date, String username) {
        return itemRepository.findByCreatedAtAfterAndUsername(date, username);  // Fetch items created after a date and username
    }

    public List<Item> getItemByUpdatedAtBefore(LocalDateTime date, String username) {
        return itemRepository.findByUpdatedAtBeforeAndUsername(date, username);  // Fetch items updated before a date and username
    }

    public List<Item> getItemByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate, String username) {
        return itemRepository.findByCreatedAtBetweenAndUsername(startDate, endDate, username);  // Fetch items created between dates and username
    }

    public List<Item> getItemByUpdatedAtBetween(LocalDateTime startDate, LocalDateTime endDate, String username) {
        return itemRepository.findByUpdatedAtBetweenAndUsername(startDate, endDate, username);  // Fetch items updated between dates and username
    }

    // UPDATE
    public Item updateItem(Item updatedItem, String username) {
        // Ensure only the owner can update the item
        Item existingItem = itemRepository.findById(updatedItem.getId()).orElseThrow(() -> new IllegalArgumentException("Item not found!"));
        if (!existingItem.getUsername().equals(username)) {
            throw new IllegalStateException("User not authorized to update this item.");
        }

        existingItem.setItemName(updatedItem.getItemName());
        existingItem.setItemPrice(updatedItem.getItemPrice());
        existingItem.setItemQuantity(updatedItem.getItemQuantity());
        existingItem.setUpdatedAt(LocalDateTime.now());  // Update the timestamp

        return itemRepository.save(existingItem);  // Save the updated item
    }

    // DELETE
    public String deleteItem(String id, String username) {
        // Ensure only the owner can delete the item
        Item item = itemRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Item not found!"));
        if (!item.getUsername().equals(username)) {
            throw new IllegalStateException("User not authorized to delete this item.");
        }

        itemRepository.deleteById(id);  // Delete the item
        return "Item successfully deleted with id: " + id;
    }
}
