package com.myapp.crud_app.repository;


import com.myapp.crud_app.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ItemRepository extends MongoRepository<Item, String> {

    List<Item> findByUsername(String username);

    List<Item> findByItemNameAndUsername(String itemName, String username);

    List<Item> findByItemPriceAndUsername(double itemPrice, String username);

    List<Item> findByItemQuantityAndUsername(int itemQuantity, String username);

    List<Item> findByCreatedAtAfterAndUsername(LocalDateTime date, String username);

    List<Item> findByUpdatedAtBeforeAndUsername(LocalDateTime date, String username);

    List<Item> findByCreatedAtBetweenAndUsername(LocalDateTime startDate, LocalDateTime endDate, String username);

    List<Item> findByUpdatedAtBetweenAndUsername(LocalDateTime startDate, LocalDateTime endDate, String username);

}
