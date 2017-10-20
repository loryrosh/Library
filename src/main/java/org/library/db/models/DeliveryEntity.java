package org.library.db.models;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "delivery")
public class DeliveryEntity {
    private int id;
    private ReaderEntity reader;
    private LibrarianEntity librarian;
    private BookEntity book;
    private Timestamp time;
    private byte onHands;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn( name = "reader_id" )
    public ReaderEntity getReader() {
        return reader;
    }
    public void setReader(ReaderEntity reader) {
        this.reader = reader;
    }

    @ManyToOne
    @JoinColumn( name = "librarian_id" )
    public LibrarianEntity getLibrarian() {
        return librarian;
    }
    public void setLibrarian(LibrarianEntity librarian) {
        this.librarian = librarian;
    }

    @ManyToOne
    @JoinColumn( name = "book_id" )
    public BookEntity getBook() {
        return book;
    }
    public void setBook(BookEntity book) {
        this.book = book;
    }

    @Basic
    @Column(name = "time")
    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    @Basic
    @Column(name = "on_hands")
    public byte getOnHands() {
        return onHands;
    }

    public void setOnHands(byte onHands) {
        this.onHands = onHands;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DeliveryEntity that = (DeliveryEntity) o;

        if (id != that.id) return false;
        if (onHands != that.onHands) return false;
        if (time != null ? !time.equals(that.time) : that.time != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (time != null ? time.hashCode() : 0);
        result = 31 * result + (int) onHands;
        return result;
    }
}
