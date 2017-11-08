package org.library.db.domain;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;


@Entity
@Table(name = "delivery")
public class Delivery extends Base {
    @ManyToOne
    @JoinColumn(name = "reader_id")
    private Reader reader;

    @ManyToOne
    @JoinColumn(name = "book_item_id")
    private BookItem bookItem;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "time")
    private Date time;

    public Delivery() {}

    public Delivery(Timestamp time) {
        this.time = time;
    }

    public Reader getReader() {
        return reader;
    }
    public void setReader(Reader reader) {
        this.reader = reader;
    }

    public BookItem getBookItem() {
        return bookItem;
    }
    public void setBookItem(BookItem bookItem) {
        this.bookItem = bookItem;
    }

    public Date getTime() {
        return time;
    }
    public void setTime(Date time) {
        this.time = time;
    }
    public LocalDate convertLocalDate() {
        return convertLocalDate(time);
    }
}
