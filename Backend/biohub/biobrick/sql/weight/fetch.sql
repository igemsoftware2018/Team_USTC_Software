SELECT
    p.part_name as part_name,
    p.favorite as favorite,
    p.has_barcode as has_barcode,
    p.status_w as status_w,
    p.sample_status_w as sample_status_w,
    p.works_w as works_w,
    p.uses_w as uses_w,
    p.review_total_w as review_total_w,
    p.review_count_w as review_count_w,
    p.has_subpart as has_subpart,
    p.deep_count_w as deep_count_w,
    p.ac_w as ac_w,
    m.rates as rates,
    m.rate_score as rate_score,
    m.stars as stars,
    m.watches as watches,
    w.weight as old_weight
FROM
    igem.parts_filtered as p
    LEFT JOIN biobrick_biobrickmeta as m ON p.part_name = m.part_name
    LEFT JOIN biobrick_biobrickweight as w ON w.part_name = p.part_name;
