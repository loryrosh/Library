package org.library.db.repo;

import org.library.db.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface BookRepository extends JpaRepository<Book, Integer> {

    @Query("select distinct book from Book book " +
            "inner join book.authors bookAuthor" +
            " where lower(book.title) like lower(concat('%',:title,'%')) " +
            " and (book.year = :year or :year is null)" +
            " and (book.genre.id =:genreId or :genreId is null)" +
            " and bookAuthor in(select author from Author author " +
            "where lower(author.lastName) like lower(concat('%',:lastName,'%'))" +
            "and lower(author.firstName) like lower(concat('%',:firstName,'%'))" +
            "and lower(author.patronymic) like lower(concat('%',:patronymic,'%')))" +
            "order by bookAuthor.lastName, book.title")
    List<Book> findByComplexQuery(@Param("title") String title, @Param("year") Integer year,
                                  @Param("genreId") Integer genreId, @Param("lastName") String lastName,
                                  @Param("firstName") String firstName, @Param("patronymic") String patronymic);
}
