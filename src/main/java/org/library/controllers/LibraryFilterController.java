package org.library.controllers;

import org.library.services.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LibraryFilterController {

    @Autowired
    LibraryService libraryService;


    /**
     * Filter list of books by params
     *
     * @param title  - book title string for search
     * @param author author full name string for parse and search
     * @param year   - full year for search
     * @param genre  - genre for search
     * @return - filtered list of books
     */
    @RequestMapping(value = {"/filters"}, method = RequestMethod.POST, produces = "application/json")
    public
    @ResponseBody
    String filterBooks(String title, String author, Integer year, Integer genre) {
        //todo adjust ajax for int year and int genre
        //todo convert year to int on client
        return libraryService.jsonBooks(libraryService.getBooksByComplexCondition(title, author, year, genre));
    }
}
