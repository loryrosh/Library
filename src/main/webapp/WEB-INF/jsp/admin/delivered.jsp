<%@ page import="org.library.services.LibraryService" %>
<%@ page import="org.library.db.domain.Delivery" %>
<%@ page import="java.util.List" %>
<%@ page import="org.library.db.domain.Author" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../templates/taglibs.jsp" %>

<%
    LibraryService libraryService = (LibraryService) request.getAttribute("lib_service");
    List<Delivery> deliveredBooks = libraryService.getAllDeliveryItems();
%>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><spring:message code="deliveredBooks" /> - Library Online&trade;</title>
    <%@ include file="../templates/meta.jsp" %>
</head>

<body>
    <%@ include file="../templates/nav.jsp" %>
    <div class="container">
        <div class="jumbotron">
            <div id="status_message" class="bg-danger"></div>
            <%@ include file="filterOrders.jsp" %>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><spring:message code="fullName" /></th>
                    <th><spring:message code="title" /></th>
                    <th><spring:message code="author" /></th>
                    <th><spring:message code="time" /></th>
                    <th><spring:message code="status" /></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    <%for (Delivery delivery : deliveredBooks) {%>
                        <tr>
                            <td><%= delivery.getReader().getFullName() %></td>
                            <td><%= delivery.getBookItem().getBook().getTitle() %></td>
                            <td>
                                <%  List<Author> authors = delivery.getBookItem().getBook().getAuthors();
                                    for (Author author : authors) { %>
                                    <%= author.getFullName() %><br/>
                                <%}%>
                            </td>
                            <td><%= delivery.convertLocalDate() %></td>
                            <td>
                                <% if(delivery.getBookItem().getStatus().getName().equals("on_hands")) { %>
                                <spring:message code="statusForHome" />
                                <%} else {%>
                                <spring:message code="statusInLib" />
                                <%}%>
                            </td>
                        </tr>
                    <%}%>
                </tbody>
            </table>
        </div>
    </div>
    <%@ include file="../templates/footer.jsp" %>
</body>
</html>
