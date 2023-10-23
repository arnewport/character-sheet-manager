package capstone.manager.data;

import capstone.manager.models.Sheet;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import static capstone.manager.TestHelper.makeSheet;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class SheetJdbcTemplateRepositoryTest {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    SheetJdbcTemplateRepository repository;

    @BeforeEach
    void setup() {
        jdbcTemplate.execute("call set_known_good_state();");
    }

    @Test
    void shouldFindById() {
        Sheet expected = makeSheet(1);

        Sheet actual = repository.findById(1);

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFindById() {
        Sheet actual = repository.findById(99);

        assertNull(actual);
    }

    @Test
    void shouldCreate() {
        Sheet expected = makeSheet(3);

        Sheet actual = repository.create(expected);

        assertEquals(expected, actual);
    }

    @Test
    void shouldUpdate() {
        Sheet sheet = makeSheet(1);
        assertTrue(repository.update(sheet));

        sheet.setId(99);
        assertFalse(repository.update(sheet));
    }

    @Test
    void shouldDelete() {
        Sheet sheet = makeSheet(3);
        repository.create(sheet);
        assertTrue(repository.deleteById(3));

        assertFalse(repository.deleteById(99));
    }
}
