<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>

<%
    LibraryService libraryService = (LibraryService) request.getAttribute("lib_service");
    List<Book> books = libraryService.getAllBooks();
    List<Author> authors = libraryService.getAllAuthors();
%>

<div class="tab-content" id="nav-tabContent">
    <%@ include file="deliveredBooks.jsp" %>
    <%@ include file="curOrders.jsp" %>
    <%@ include file="showReaders.jsp" %>
    <%@ include file="showBooks.jsp" %>
    <%@ include file="showAuthors.jsp" %>
</div>
