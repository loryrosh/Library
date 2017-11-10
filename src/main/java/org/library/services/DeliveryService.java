package org.library.services;

import org.library.db.domain.BookItem;
import org.library.db.domain.BookOrder;
import org.library.db.domain.Delivery;
import org.library.db.domain.Reader;
import org.library.db.repo.BookItemRepository;
import org.library.db.repo.BookOrderRepository;
import org.library.db.repo.DeliveryRepository;
import org.library.db.repo.ItemStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryService {

    @Autowired
    DeliveryRepository deliveryRepository;

    @Autowired
    BookOrderRepository bookOrderRepository;

    @Autowired
    BookItemRepository bookItemRepository;

    @Autowired
    ItemStatusRepository itemStatusRepository;

    public int freeBook(BookOrder bookOrder) {
        int bookId = bookOrder.getBook().getId();
        //TODO create method for get BookItem by id and status
        List<BookItem> bookItems = bookItemRepository.findByBookId(bookId);
        for (BookItem item:
             bookItems) {
            if (item.getStatus().getName().equals("free")) return item.getId();
        }
        return -1;
    }

    public boolean addDeliveryByBookOrder(BookOrder bookOrder, boolean toHand) {
        int freeBookItem = freeBook(bookOrder);
        if (freeBookItem == -1) {
            return false;
        }
        //TODO change book item status
        //TODO delete order from bookOrder

        addDelivery(bookOrder.getReader(), bookItemRepository.getOne(freeBook(bookOrder)));
        return true;
    }

    public boolean addDelivery(Reader reader, BookItem bookItem) {
        Delivery delivery = new Delivery(reader, bookItem);
        deliveryRepository.save(delivery);
        return true;
    }




}

