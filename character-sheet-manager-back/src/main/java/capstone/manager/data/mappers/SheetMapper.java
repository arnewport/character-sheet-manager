package capstone.manager.data.mappers;

import capstone.manager.models.Sheet;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SheetMapper implements RowMapper<Sheet>{

    @Override
    public Sheet mapRow(ResultSet resultSet, int i) throws SQLException {
        Sheet sheet = new Sheet();
        sheet.setId(resultSet.getInt("sheet_id"));
        sheet.setPlayerName(resultSet.getString("player_name"));
        sheet.setCharacterName(resultSet.getString("character_name"));
        sheet.setCurHitPoints(resultSet.getInt("cur_hit_points"));
        sheet.setMaxHitPoints(resultSet.getInt("max_hit_points"));
        sheet.setArmorClass(resultSet.getInt("armor_class"));
        sheet.setSavingThrow(resultSet.getInt("saving_throw"));
        sheet.setThac0(resultSet.getInt("thac0"));
        sheet.setAttackBonus(resultSet.getInt("attack_bonus"));
        return sheet;
    }
}
