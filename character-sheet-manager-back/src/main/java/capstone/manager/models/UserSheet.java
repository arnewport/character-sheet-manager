package capstone.manager.models;

import java.util.Objects;

public class UserSheet {

    private int id;
    private int userId;
    private int sheetId;
    private String role;
    private String status;

    public UserSheet() {
    }

    public UserSheet(int id, int userId, int sheetId, String role, String status) {
        this.id = id;
        this.userId = userId;
        this.sheetId = sheetId;
        this.role = role;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getSheetId() {
        return sheetId;
    }

    public void setSheetId(int sheetId) {
        this.sheetId = sheetId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserSheet userSheet = (UserSheet) o;
        return id == userSheet.id && userId == userSheet.userId && sheetId == userSheet.sheetId && Objects.equals(role, userSheet.role) && Objects.equals(status, userSheet.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, sheetId, role, status);
    }
}
