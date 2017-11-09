<%@ page import="org.library.db.domain.Reader" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<% List<Reader> readers = libraryService.getAllReaders(); %>

<div class="tab-pane fade show" id="nav-readers" role="tabpanel" aria-labelledby="nav-readers-tab">
    <table class="table table-striped">
        <thead>
        <tr>
            <th><spring:message code="fullName" /></th>
            <th><spring:message code="registrationDate" /></th>
            <th><spring:message code="fines" /></th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <%for (Reader reader : readers) {%>
        <tr>
            <td><%= reader.getFullName() %></td>
            <td><%= reader.convertLocalDate().toString() %></td>
            <td><%= reader.getFines() %>&nbsp;&#x20bd;</td>
            <td>
                <button type="submit" class="btn btn-primary"
                        id="deleteProfile_<%= reader.getId()%>" name="deleteProfile_<%= reader.getId()%>">
                    <spring:message code="toDeleteProfile" />
                </button>
            </td>
        </tr>
        <%}%>
        </tbody>
    </table>
</div>
