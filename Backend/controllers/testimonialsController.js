const pool = require('../config/db');

const TestimonialController = {
    // Fetch all testimonials
    async getAll() {
        const result = await pool.query(
            'SELECT * FROM testimonials ORDER BY created_at DESC'
        );
        return result.rows;
    },

    // Create a new testimonial
    async create(data) {
        const { author_name, quote, image_url } = data;
        const result = await pool.query(
            'INSERT INTO testimonials (author_name, quote, image_url) VALUES ($1, $2, $3) RETURNING *',
            [author_name, quote, image_url]
        );
        return result.rows[0];
    },

    // Delete a testimonial
    async delete(id) {
        const result = await pool.query(
            'DELETE FROM testimonials WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rowCount === 0) throw new Error('Testimonial not found');
        return { message: 'Deleted successfully' };
    }
};

module.exports = TestimonialController;