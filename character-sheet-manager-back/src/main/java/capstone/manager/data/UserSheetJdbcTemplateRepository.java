package capstone.manager.data;

import capstone.manager.data.mappers.UserSheetMapper;
import capstone.manager.models.UserSheet;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Repository
public class UserSheetJdbcTemplateRepository implements UserSheetRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserSheetJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<UserSheet> findSheetsByUserId(int userId) {
        final String sql = """
                select *
                from user_sheet
                where user_id = ?;
                """;

        return jdbcTemplate.query(sql, new UserSheetMapper(), userId);
    }

    @Override
    @Transactional
    public UserSheet create(UserSheet userSheet) {
        SimpleJdbcInsert insert = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName("user_sheet")
                .usingGeneratedKeyColumns("user_sheet_id");

        HashMap<String, Object> args = new HashMap<>();
        args.put("user_id", userSheet.getUserId());
        args.put("sheet_id", userSheet.getSheetId());
        args.put("role", userSheet.getRole());
        args.put("status", userSheet.getStatus());

        int id = insert.executeAndReturnKey(args).intValue();
        userSheet.setId(id);

        return userSheet;
    }

    @Override
    @Transactional
    public boolean deleteById(int id) {
        final String sql = """
                delete from user_sheet
                where user_sheet_id = ?;
                """;

        jdbcTemplate.update(sql, id);
        return jdbcTemplate.update(sql, id) > 0;
    }

    @Override
    @Transactional
    public boolean deleteBySheetId(int sheetId) {
        final String sql = """
                delete from user_sheet
                where sheet_id = ?;
                """;

        jdbcTemplate.update(sql, sheetId);
        return jdbcTemplate.update(sql, sheetId) > 0;
    }
}
