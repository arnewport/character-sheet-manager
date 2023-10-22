package capstone.manager.data;

import capstone.manager.data.mappers.SheetMapper;
import capstone.manager.models.Sheet;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;

@Repository
public class SheetJdbcTemplateRepository implements SheetRepository {

    private final JdbcTemplate jdbcTemplate;

    public SheetJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Sheet findById(int id) {

        final String sql = """
                select *
                from sheet
                where sheet_id = ?;
                """;

        return jdbcTemplate.query(sql, new SheetMapper(), id).stream()
                .findFirst().orElse(null);
    }
    
    @Override
    @Transactional
    public Sheet create(Sheet sheet) {

        SimpleJdbcInsert insert = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName("sheet")
                .usingGeneratedKeyColumns("sheet_id");

        HashMap<String, Object> args = new HashMap<>();
        args.put("player_name", sheet.getPlayerName());
        args.put("character_name", sheet.getCharacterName());
        args.put("cur_hit_points", sheet.getCurHitPoints());
        args.put("max_hit_points", sheet.getMaxHitPoints());
        args.put("armor_class", sheet.getArmorClass());
        args.put("saving_throw", sheet.getSavingThrow());
        args.put("thac0", sheet.getThac0());
        args.put("attack_bonus", sheet.getAttackBonus());

        int id = insert.executeAndReturnKey(args).intValue();
        sheet.setId(id);

        return sheet;
    }

    @Override
    @Transactional
    public boolean update(Sheet sheet) {

        final String sql = """
                update sheet set
                player_name = ?,
                character_name = ?,
                cur_hit_points = ?,
                max_hit_points = ?,
                armor_class = ?,
                saving_throw = ?,
                thac0 = ?,
                attack_bonus = ?
                where sheet_id = ?;
                """;

        return jdbcTemplate.update(sql,
            sheet.getPlayerName(),
            sheet.getCharacterName(),
            sheet.getCurHitPoints(),
            sheet.getMaxHitPoints(),
            sheet.getArmorClass(),
            sheet.getSavingThrow(),
            sheet.getThac0(),
            sheet.getAttackBonus()) > 0;
        }

    @Override
    @Transactional
    public boolean deleteById(int id) {

        final String sql = """
                delete from sheet
                where sheet_id = ?;
                """;

        jdbcTemplate.update(sql, id);
        return jdbcTemplate.update(sql, id) > 0;
    }
}
