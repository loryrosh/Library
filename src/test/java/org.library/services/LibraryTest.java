package org.library.services;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.library.db.domain.*;
import org.library.db.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class LibraryTest {
    protected List<Book> testBooks;
    protected List<Author> testAuthors;
    protected List<Genre> testGenres;
    protected List<Genre> testGenresEmpty;
    protected List<Integer> testBookIdsAll;
    protected List<Integer> testBookIdsEmpty;
    protected List<AuthorBook> testAuthorBooks;
    protected List<Reader> testReaders;
    protected List<BookOrder> testBookOrders;
    protected List<BookItem> testBookItems;
    protected List<Delivery> testDeliveries;
    protected List<ItemStatus> testItemStatuses;

    @Autowired
    AuthorRepository authorRepository;
    @Autowired
    GenreRepository genreRepository;
    @Autowired
    BookRepository bookRepository;
    @Autowired
    AuthorBookRepository authorBookRepository;
    @Autowired
    ReaderRepository readerRepository;
    @Autowired
    BookOrderRepository bookOrderRepository;
    @Autowired
    BookItemRepository bookItemRepository;
    @Autowired
    DeliveryRepository deliveryRepository;
    @Autowired
    ItemStatusRepository itemStatusRepository;

    @Before
    public void prepareForTests() throws Exception {
        prepareTestData();
    }

    private void prepareTestData() {
        genresSetup();
        authorsSetup();
        booksSetup();
        authorBooksSetup();
        readesSetup();
        bookOrdersSetup();
        itemStatusesSetup();
        bookItemsSetup();
        deliveriesSetup();
    }

    private void genresSetup() {
        testGenres = new LinkedList<>();
        testGenres.add(new Genre("aaa"));
        testGenres.add(new Genre("aaababb"));
        testGenres.add(new Genre("bbb bbb"));
        testGenresEmpty = new LinkedList<>();
    }

    private void authorsSetup() {
        testAuthors = new LinkedList<>();
        testAuthors.add(new Author("AAA", "BBB", "CCC", 1731));
        testAuthors.add(new Author("AAA", "BBB", "AAA", 1732));
        testAuthors.add(new Author("CCC", "BBB", "BBB", 1732));
    }

    private void booksSetup() {
        testBooks = new ArrayList<>();
        testBooks.add(new Book("l1", testGenres.get(0), "BOok book1", "RU", 2189, (short) 6, false));
        testBooks.add(new Book("l1", testGenres.get(1), "book BOok2", "RU", 2189, (short) 6, false));
        testBooks.add(new Book("l1", testGenres.get(2), "bookbook", "RU", 2178, (short) 6, false));
        testBookIdsEmpty = new LinkedList<>();
    }

    private void bookIdsSetup() {
        testBookIdsAll = new LinkedList<>();
        testBookIdsAll.add(bookRepository.findByTitleContaining(testBooks.get(0).getTitle()).get(0).getId());
        testBookIdsAll.add(bookRepository.findByTitleContaining(testBooks.get(1).getTitle()).get(0).getId());
        testBookIdsAll.add(bookRepository.findByTitleContaining(testBooks.get(2).getTitle()).get(0).getId());
    }

    private void authorBooksSetup() {
        testAuthorBooks = new LinkedList<>();
        testAuthorBooks.add(new AuthorBook(testAuthors.get(0), testBooks.get(0)));
        testAuthorBooks.add(new AuthorBook(testAuthors.get(0), testBooks.get(1)));
        testAuthorBooks.add(new AuthorBook(testAuthors.get(2), testBooks.get(2)));
    }

    private void readesSetup() {
        testReaders = new LinkedList<>();
        testReaders.add(new Reader("amma@mail.ru","pwd","am","ma","",new Date(System.currentTimeMillis()),0.0,false));
        testReaders.add(new Reader("maam@mail.ru","pwd","ma","am","",new Date(System.currentTimeMillis()),0.0,false));
    }

    private void bookOrdersSetup() {
        testBookOrders = new LinkedList<>();
        testBookOrders.add(new BookOrder(testReaders.get(0),testBooks.get(0),true));
        testBookOrders.add(new BookOrder(testReaders.get(0),testBooks.get(1),true));
        testBookOrders.add(new BookOrder(testReaders.get(1),testBooks.get(2),true));
    }

    private void itemStatusesSetup() {
        testItemStatuses = new LinkedList<>();
        testItemStatuses.add(new ItemStatus("free"));
        testItemStatuses.add(new ItemStatus("on hands"));
        testItemStatuses.add(new ItemStatus("stydy"));
    }

    private void bookItemsSetup() {
        testBookItems = new LinkedList<>();
        testBookItems.add(new BookItem(1,testBooks.get(0),testItemStatuses.get(1)));
        testBookItems.add(new BookItem(2,testBooks.get(1),testItemStatuses.get(1)));
        testBookItems.add(new BookItem(3,testBooks.get(2),testItemStatuses.get(1)));
        testBookItems.add(new BookItem(4,testBooks.get(0),testItemStatuses.get(1)));
        testBookItems.add(new BookItem(5,testBooks.get(0),testItemStatuses.get(0)));
        testBookItems.add(new BookItem(6,testBooks.get(0),testItemStatuses.get(0)));
        testBookItems.add(new BookItem(7,testBooks.get(1),testItemStatuses.get(0)));
        testBookItems.add(new BookItem(8,testBooks.get(1),testItemStatuses.get(0)));
        testBookItems.add(new BookItem(9,testBooks.get(2),testItemStatuses.get(0)));
    }

    private void deliveriesSetup() {
        testDeliveries = new LinkedList<>();
        testDeliveries.add(new Delivery(testReaders.get(0),testBookItems.get(0)));
        testDeliveries.add(new Delivery(testReaders.get(0),testBookItems.get(1)));
        testDeliveries.add(new Delivery(testReaders.get(0),testBookItems.get(2)));
        testDeliveries.add(new Delivery(testReaders.get(1),testBookItems.get(3)));
    }


    protected void saveTestData() {
        genreRepository.save(testGenres);
        authorRepository.save(testAuthors);
        bookRepository.save(testBooks);
        authorBookRepository.save(testAuthorBooks);
        readerRepository.save(testReaders);
        bookOrderRepository.save(testBookOrders);
        itemStatusRepository.save(testItemStatuses);
        bookItemRepository.save(testBookItems);
        deliveryRepository.save(testDeliveries);
        bookIdsSetup();
    }
}