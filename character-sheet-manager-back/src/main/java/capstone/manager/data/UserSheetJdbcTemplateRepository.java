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
    public List<UserSheet> findUserSheetsByUserId(int userId) {
        final String sql = """
                select us.*, s.player_name, s.character_name
                from user_sheet as us
                inner join sheet as s on us.sheet_id = s.sheet_id
                where user_id = ?;
                """;

        return jdbcTemplate.query(sql, new UserSheetMapper(), userId);
    }

    @Override
    public List<Integer> findUserIdsBySheetId(int sheetId) {
        final String sql = """
                select user_id
                from user_sheet
                where sheet_id = ?;
                """;

        return jdbcTemplate.queryForList(sql, Integer.class, sheetId);
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

    // current unused; will be implemented in the future
    @Override
    @Transactional
    public boolean deleteById(int id) {
        final String sql = """
                delete from user_sheet
                where user_sheet_id = ?;
                """;

        int deletions = jdbcTemplate.update(sql, id);
        return deletions > 0;
    }

    @Override
    @Transactional
    public boolean deleteBySheetId(int sheetId) {
        final String sql = """
                delete from user_sheet
                where sheet_id = ?;
                """;

        int deletions = jdbcTemplate.update(sql, sheetId);
        return deletions > 0;
    }
}
