package com.myapp.crud_app.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Document(collection = "mucrudapp")
@Data
@Getter
@Setter
public class Item {

    // Getters and Setters

    @Id
    private String id;  // Primary key
    private String itemName;
    private double itemPrice;
    private int itemQuantity;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    private String username;  // To link the item with a user with userName
    private String userId;    // To link the item with a user with userId

    // Constructors
    public Item() {}

    public Item(String itemName, double itemPrice, int itemQuantity /*String itemImage*/) {
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemQuantity = itemQuantity;
//        this.itemImage = itemImage;
//        this.createdAt = new LocalDateTime();
//        this.updatedAt = new LocalDateTime();
    }



}
