package capstone.manager.data;

import capstone.manager.models.UserSheet;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.List;

import static capstone.manager.TestHelper.makeUserSheet;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class UserSheetJdbcTemplateRepositoryTest {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    UserSheetJdbcTemplateRepository repository;

    @BeforeEach
    void setup() {
        jdbcTemplate.execute("call set_known_good_state();");
    }

    @Test
    void shouldFindSheetsByUserId() {
        ArrayList<UserSheet> expected = new ArrayList<UserSheet>();
        expected.add(makeUserSheet(1, 1, 1));
        List<UserSheet> actual = repository.findUserSheetsByUserId(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFindSheetsByUserId() {
        ArrayList<UserSheet> expected = new ArrayList<>();
        expected.add(makeUserSheet(99, 99, 99));
        List<UserSheet> actual = repository.findUserSheetsByUserId(1);
        assertNotEquals(expected, actual);
    }

    @Test
    void shouldFindUserIdsBySheetId() {
        ArrayList<Integer> expected = new ArrayList<>();
        expected.add(1);
        List<Integer> actual = repository.findUserIdsBySheetId(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFindUserIdsBySheetId() {
        ArrayList<Integer> expected = new ArrayList<>();
        expected.add(99);
        List<Integer> actual = repository.findUserIdsBySheetId(1);
        assertNotEquals(expected, actual);
    }

    @Test
    void shouldCreate() {
        UserSheet expected = makeUserSheet(3, 2, 1);

        UserSheet actual = repository.create(expected);

        assertEquals(expected, actual);
    }

    @Test
    void shouldDelete() {
        UserSheet userSheet = makeUserSheet(3, 2, 1);
        repository.create(userSheet);
        assertTrue(repository.deleteBySheetId(1));

        assertFalse(repository.deleteBySheetId(99));
    }
}
