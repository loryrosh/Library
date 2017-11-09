<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>

<%
    LibraryService libraryService = (LibraryService) request.getAttribute("lib_service");
    List<Book> books = libraryService.getAllBooks();
    List<Genre> genres = libraryService.getAllGenres();

    Reader curUser = (Reader) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    List<BookOrder> orders = libraryService.getAllOrdersByReader(curUser.getId());
    List<Delivery> deliveredBooks = libraryService.getAllDeliveryItemsByReader(curUser.getId());
%>

<div class="tab-content" id="nav-tabContent">
    <%@ include file="find.jsp" %>
    <%@ include file="delivered.jsp" %>
    <%@ include file="wishlist.jsp" %>
    <%@ include file="profile.jsp" %>
</div>

<div class="hidden">
    <div id="succ_order_created"><spring:message code="succOrderCreated" /></div>
    <div id="error_delete_account"><spring:message code="errDeleteAccount" /></div>
</div>
