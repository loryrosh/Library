<%@ page import="org.library.db.domain.BookOrder" %>
<%@ page import="org.library.db.domain.Reader" %>
<%@ page import="org.library.services.LibraryService" %>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder" %>
<%@ page import="java.util.List" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../templates/taglibs.jsp" %>

<%
    LibraryService libraryService = (LibraryService) request.getAttribute("lib_service");
    Reader curUser = (Reader) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    List<BookOrder> orders = libraryService.getAllOrdersByReader(curUser.getId());
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><spring:message code="whishlist" /> - Library Online&trade;</title>
    <%@ include file="../templates/meta.jsp" %>
</head>

<body>
    <%@ include file="../templates/nav.jsp" %>
    <div class="container">
        <div class="jumbotron">
            <div id="status_message" class="bg-danger"></div>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><spring:message code="title" /></th>
                    <th><spring:message code="year" /></th>
                    <th><spring:message code="wishStatus" /></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    <%for (BookOrder order : orders) {%>
                        <tr>
                            <td><%= order.getBook().getTitle() %></td>
                            <td><%= order.getBook().getYear() %></td>
                            <td width="20%">
                                <% if(order.getOnHands()) { %>
                                    <spring:message code="wishStatusForHome" />
                                <%} else {%>
                                    <spring:message code="wishStatusInLib" />
                                <%}%>
                            </td>
                            <td>
                                <button type="submit" class="btn btn-primary cancelOrder"
                                        id="delete_<%= order.getId()%>" name="delete_<%= order.getId()%>">
                                    <spring:message code="toDelete" />
                                </button>
                            </td>
                        </tr>
                    <%}%>
                </tbody>
            </table>
        </div>
    </div>
    <div class="hidden">
        <div id="error_order_canceled"><spring:message code="errorOrderCanceled" /></div>
        <div id="succ_order_canceled"><spring:message code="succOrderCanceled" /></div>
    </div>
    <%@ include file="../templates/footer.jsp" %>
</body>
</html>
