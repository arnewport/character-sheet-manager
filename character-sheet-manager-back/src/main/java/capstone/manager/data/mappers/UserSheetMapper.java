package capstone.manager.data.mappers;

import capstone.manager.models.UserSheet;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserSheetMapper implements RowMapper<UserSheet> {

    @Override
    public UserSheet mapRow(ResultSet resultSet, int i) throws SQLException {
        UserSheet userSheet = new UserSheet();
        userSheet.setId(resultSet.getInt("user_sheet_id"));
        userSheet.setUserId(resultSet.getInt("user_id"));
        userSheet.setSheetId(resultSet.getInt("sheet_id"));
        userSheet.setRole(resultSet.getString("role"));
        userSheet.setStatus(resultSet.getString("status"));
        return userSheet;
    }
    
}
